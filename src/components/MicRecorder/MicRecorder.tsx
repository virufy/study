/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Timer from 'react-compound-timer';
import { useTranslation } from 'react-i18next';

// Sentry
import * as Sentry from '@sentry/react';

// Utils
import { isIOS, isSafari } from 'react-device-detect';
import RecorderService from 'helper/audio/RecorderService';
import FileHelper from 'helper/fileHelper';
import { getDuration } from 'helper/getDuration';

// Modals
import RecordErrorModal from 'modals/RecordErrorModal';

// Images
import StartSVG from 'assets/icons/start.svg';
import StopSVG from 'assets/icons/stop.svg';

// Styles
import {
  MicRecorderContainer,
  MicRecorderButton,
  MicRecorderStartImage,
  MicRecorderStopImage,
  MicRecorderTimerContainer,
  MicRecorderTimerReleaseTextContainer,
  MicRecorderTextP,
  MicButtonsContainer,
  MicButtonWithText,
  MicNote,
} from './style';

interface MicRecorderProps {
  className?: string;
  maxTimeInSeconds?: number;
  minTimeInSeconds?: number;
  onNewRecord: (file: File, humanReadableSize: string) => void;
  delay?: number;
  recordingFile: any;
  isShortAudioCollection?: boolean;
}

const baseConfig = {
  usingMediaRecorder: false,
  sampleRate: 48000,
  manualEncoderId: isSafari || isIOS ? 'wav' : 'flac', // wav / mp3 / flac
  processorBufferSize: isSafari || isIOS ? 2048 : 4096, // 4096 flac / 2048 wav
};
export interface RecorderServiceType {
  config: {
    broadcastAudioProcessEvents: boolean; // default: false
    createAnalyserNode: boolean; // default: false
    createDynamicsCompressorNode: boolean; // default: false
    forceScriptProcessor: false; // default: false
    manualEncoderId: string; // default: 'wav'
    micGain: number; // default: 1.0
    processorBufferSize: number; // default: 2048
    stopTracksAndCloseCtxWhenFinished: boolean; // default: true
    usingMediaRecorder: boolean; // default: typeof window.MediaRecorder !== 'undefined'
    enableEchoCancellation: boolean; // default: true
    sampleRate: number; // default: 44100
  };
  em: DocumentFragment;
  startRecording: (timeslice?: number) => Promise<void>;
  stopRecording: () => void;
  cleanup: () => void;
}

const MicRecorder = ({
  className = '',
  maxTimeInSeconds = 30, // 30 segs
  minTimeInSeconds = 5, // 5 segs
  onNewRecord,
  delay = 500, // 500ms
  recordingFile,
  isShortAudioCollection,
}: MicRecorderProps) => {
  // Hooks
  const { t } = useTranslation();

  // Refs
  const recordingService = React.useRef<RecorderServiceType>();
  const audioSamples = React.useRef<number>(0);
  const timerRef = React.useRef<any>();
  const timeout = React.useRef<number>();
  const target = React.useRef<HTMLButtonElement>();

  // States
  const [micAllowed, setMicAllowed] = React.useState<boolean>(true);
  const [recordingInProgress, setRecordingInProgress] = React.useState<boolean>();
  const [showReleaseText, setShowReleaseText] = React.useState<boolean>(false);
  const [showShortRecordingText, setShowShortRecordingText] = React.useState<boolean>(false);
  const [longPressTriggered, setLongPressTriggered] = React.useState<boolean>(false);

  // Handlers
  const onAudioProcess = React.useCallback((e: any) => {
    audioSamples.current += 1;
    const { inputBuffer, outputBuffer } = e.detail;
    for (let channel = 0; channel < outputBuffer.numberOfChannels; channel += 1) {
      const inputData = inputBuffer.getChannelData(channel);
      const outputData = outputBuffer.getChannelData(channel);
      // Each sample
      for (let sample = 0; sample < inputBuffer.length; sample += 1) {
        outputData[sample] = inputData[sample];
      }
    }
  }, []);

  const onNewRecording = React.useCallback(async (e: any) => {
    const { detail } = e;
    const { recording } = detail;
    const blob = await fetch(recording.blobUrl).then(r => r.blob());
    const fileName = `Filename.${baseConfig.manualEncoderId}`;
    const file = FileHelper.blobToFile(blob, fileName);
    const humanReadableSize = FileHelper.sizeAsHuman(file.size, true);

    onNewRecord(file, humanReadableSize);
  }, [onNewRecord]);

  // Effects
  React.useEffect(() => {
    recordingService.current = new RecorderService({
      ...baseConfig,
      sampleRate: isShortAudioCollection ? 16000 : baseConfig.sampleRate,
      onRecording: onNewRecording,
      onAudioProcesss: onAudioProcess,
    }) as RecorderServiceType;

    const userMediaConstraints = {
      audio: {
        echoCancellation: recordingService.current.config.enableEchoCancellation,
      },
    };
    navigator.mediaDevices.getUserMedia(userMediaConstraints)
      .then(() => {
        setMicAllowed(true);
      })
      .catch(err => {
        setMicAllowed(false);
        Sentry.captureException(err);
      });

    if (recordingFile) {
      const file = recordingFile as File;
      if (file.size) {
        const audio = new Audio(URL.createObjectURL(file));
        audio.defaultMuted = true;
        audio.muted = true;
        audio.load();
        const listenerFn = async () => {
          audio.removeEventListener('loadedmetadata', listenerFn);
          getDuration(audio).then(result => {
            timerRef.current?.setTime(result * 1000);
          });
        };
        audio.addEventListener('loadedmetadata', listenerFn);
      }
    }

    return () => {
      if (recordingService.current) {
        recordingService.current.cleanup();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handlers
  const handleStartRecording = React.useCallback(() => {
    if (recordingService.current) {
      audioSamples.current = 0;
      recordingService.current
        .startRecording()
        .then(() => {
          setRecordingInProgress(true);
          setShowShortRecordingText(false);
          if (timerRef.current) {
            timerRef.current.reset();
            timerRef.current?.setTime(0);
            timerRef.current.start();
          }
        })
        .catch((error: any) => console.error('ERROR', error));
    }
  }, []);

  const handleStopRecording = React.useCallback(() => {
    if (recordingService.current) {
      recordingService.current.stopRecording();
      setRecordingInProgress(false);
      if (timerRef.current) {
        if (timerRef.current.getTime() / 1000 < minTimeInSeconds) {
          setShowShortRecordingText(true);
        }
        timerRef.current.stop();
      }
    }
  }, [minTimeInSeconds]);

  const handleFormatValue = React.useCallback((value: number) => (value < 10 ? `0${value}` : value), []);

  const preventDefault = (event: any) => {
    if (!('touches' in event)) event.preventDefault();
  };

  const handleStartLongPress = React.useCallback(
    event => {
      if (event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        setShowReleaseText(true);
        setLongPressTriggered(true);
        setShowShortRecordingText(false);
      }, delay);
    },
    [delay],
  );

  const handleEndLongPress = React.useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (longPressTriggered) {
      setShowReleaseText(false);
    }
    setLongPressTriggered(false);
    if (target.current) {
      target.current.removeEventListener('touchend', preventDefault);
    }
  },
  [longPressTriggered]);

  return (
    <MicRecorderContainer className={className}>
      <MicRecorderTimerReleaseTextContainer>
        {!showShortRecordingText
          && (
            <MicRecorderTextP
              show={showReleaseText}
            >
              {recordingInProgress ? t('recordingsIntroduction:releaseButtonStop') : t('recordingsIntroduction:releaseButtonStart')}
            </MicRecorderTextP>
          )}
        <RecordErrorModal
          isOpen={showShortRecordingText}
          modalTitle="Oops."
          onConfirm={handleStartRecording}
        >
          {t('recordingsIntroduction:shortRecording', { seconds: minTimeInSeconds })}
        </RecordErrorModal>
      </MicRecorderTimerReleaseTextContainer>
      <MicRecorderTimerContainer>
        <Timer
          ref={timerRef}
          startImmediately={false}
          checkpoints={[
            {
              time: maxTimeInSeconds * 1000,
              callback: handleStopRecording,
            },
          ]}
        >
          <Timer.Minutes />
          :
          <Timer.Seconds formatValue={handleFormatValue} />
        </Timer>
      </MicRecorderTimerContainer>
      <MicButtonsContainer>
        <MicButtonWithText>
          <MicRecorderButton
            disabled={!micAllowed || recordingInProgress}
            onClick={handleStartRecording}
            onMouseDown={handleStartLongPress}
            onMouseUp={handleEndLongPress}
            onTouchStart={handleStartLongPress}
            onTouchEnd={handleEndLongPress}
            onMouseLeave={handleEndLongPress}
          >
            <MicRecorderStartImage
              src={StartSVG}
              alt="Start"
            />
          </MicRecorderButton>
          <MicNote>{t('recordingsRecord:record')}</MicNote>
        </MicButtonWithText>
        <MicButtonWithText>
          <MicRecorderButton
            disabled={!micAllowed || !recordingInProgress}
            onClick={handleStopRecording}
            onMouseDown={handleStartLongPress}
            onMouseUp={handleEndLongPress}
            onTouchStart={handleStartLongPress}
            onTouchEnd={handleEndLongPress}
            onMouseLeave={handleEndLongPress}
          >
            <MicRecorderStopImage
              src={StopSVG}
              alt="Stop"
            />
          </MicRecorderButton>
          <MicNote>{t('recordingsRecord:recordStop')}</MicNote>
        </MicButtonWithText>
      </MicButtonsContainer>
    </MicRecorderContainer>
  );
};

export default React.memo(MicRecorder);
