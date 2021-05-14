/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation } from 'react-i18next';

// Form
import { useStateMachine } from 'little-state-machine';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import WizardButtons from 'components/WizardButtons';

// Utils
import { updateAction } from 'utils/wizard';
import { scrollToTop } from 'helper/scrollHelper';

// Images
import PlaySVG from 'assets/icons/play.svg';
import CrossSVG from 'assets/icons/cross.svg';

// Styles
import fileHelper from 'helper/fileHelper';
import {
  MainContainer,
  Subtitle,
  PlayerContainer,
  PlayerContainerTop,
  PlayerContainerBottom,
  PlayerPlay,
  PlayerCross,
  PlayerFileName,
  PlayerTopMiddle,
  PlayerFileSize,
  PlayerPlayContainer,
  PlayerCrossContainer,
  PlayerBottomTop,
  PlayerBottomTrack,
  PlayerBottomThumb,
  PlayerBottomBottom,
  PlayerTimeIndicator,
} from './style';

const ListenAudio = ({
  storeKey,
  previousStep,
  nextStep,
  metadata,
}: Wizard.StepProps) => {
  const isCoughLogic = React.useMemo(
    () => (metadata ? metadata.currentLogic === 'recordYourCough' : false),
    [metadata],
  );

  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const { setDoGoBack, setTitle } = useHeaderContext();
  const history = useHistory();
  const location = useLocation<{ from: string }>();
  const { state, action } = useStateMachine(updateAction(storeKey));
  const { t } = useTranslation();

  const myState = state?.[storeKey]?.[metadata?.currentLogic];
  const file: File | null = myState ? myState.recordingFile || myState.uploadedFile : null;

  // Refs
  const refAudio = React.useRef<HTMLMediaElement>(null);
  const refTimer = React.useRef<any>();

  // States
  const [activeStep, setActiveStep] = React.useState(true);
  const [playing, setPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState<number>(0);
  const [progressSeconds, setProgressSeconds] = React.useState<number>(0);

  // Effects
  React.useEffect(() => {
    const stepTimer = (ms: number) => {
      setProgressSeconds(ms / 1000);
      refTimer.current = setTimeout(() => {
        stepTimer(ms + 200);
      }, 200);
    };

    const fnPlaying = () => {
      stepTimer(0);
      setTimeout(() => {
        setPlaying(true);
      }, 0);
    };

    const fnPause = (e: any) => {
      setDuration(e.target.currentTime);
      setProgressSeconds(e.target.currentTime);
      setPlaying(false);
      clearTimeout(refTimer.current);
    };

    const fnLoad = async (e: any) => {
      const audioDuration: number = await new Promise(resolver => {
        if (e.target.duration !== Infinity) {
          resolver(e.target.duration);
        }
        const tempFn = () => {
          e.target.pause();
          e.target.volume = 1;
          e.target.currentTime = 0;
          resolver(e.target.duration);
          e.target.removeEventListener('durationchange', tempFn);
        };

        e.target.addEventListener('durationchange', tempFn);
        e.target.volume = 0;
        e.target.currentTime = 24 * 60 * 60; // Unprobable time
      });
      e.target.volume = 1;
      setDuration(audioDuration);
    };

    if (refAudio.current) {
      refAudio.current.addEventListener('playing', fnPlaying);
      refAudio.current.addEventListener('pause', fnPause);
      refAudio.current.addEventListener('loadedmetadata', fnLoad);
    }

    return () => {
      if (refAudio.current) {
        refAudio.current.removeEventListener('playing', fnPlaying);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        refAudio.current.removeEventListener('pause', fnPause);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        refAudio.current.removeEventListener('loadedmetadata', fnLoad);
      }
    };
  }, []);

  // Memos
  const {
    fileUrl,
    fileName,
    fileSize,
  } = React.useMemo(() => {
    const out = {
      fileUrl: '',
      fileName: '',
      fileSize: '',
    };
    if (file && file.size !== undefined) {
      try {
        const url = URL.createObjectURL(file);
        out.fileUrl = url;
        out.fileName = file.name;
        out.fileSize = fileHelper.sizeAsHuman(file.size, true);
      } catch (e) {
        console.log('Error', e);
      }
    }
    return out;
  }, [file]);

  // Handlers
  const handleNext = React.useCallback(() => {
    if (nextStep) {
      // action(values);
      setActiveStep(false);
      history.push(nextStep);
    }
  }, [history, nextStep]);

  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
    if (location.state && location.state.from) {
      const newRoute = `/submit-steps/step-record/${isCoughLogic ? 'cough' : 'speech'}`;
      history.push(newRoute);
    } else if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [location.state, previousStep, history, isCoughLogic]);

  const handleRemoveFile = React.useCallback(() => {
    if (playing) {
      if (refAudio.current) {
        refAudio.current.pause();
      }
    }

    if (state?.[storeKey][metadata?.currentLogic]) {
      action({
        [metadata?.currentLogic]: {
          recordingFile: null,
          uploadFile: null,
        },
      });
      handleDoBack();
    }
  }, [playing, state, storeKey, metadata, action, handleDoBack]);

  const handlePlay = React.useCallback(() => {
    if (!playing) {
      setProgressSeconds(0);
      if (refAudio.current) {
        refAudio.current.play();
      }
    }
  }, [playing]);

  // Effects
  useEffect(() => {
    scrollToTop();
    if (isCoughLogic) {
      setTitle(t('recordingsListen:recordCough.header'));
    } else {
      setTitle(t('recordingsListen:recordCough.header'));
    }
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, isCoughLogic, setDoGoBack, setTitle, t]);

  // Memos
  const {
    currentTime,
    remainingTime,
    trackProgress,
  } = React.useMemo(() => {
    const out = {
      currentTime: '0:00',
      remainingTime: '0:00',
      trackProgress: 0,
    };
    if (duration) {
      const minutes = Math.floor(Math.floor(progressSeconds) / 60);
      const seconds = Math.floor(progressSeconds) - (minutes * 60);
      out.currentTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

      const timeRemaining = duration > progressSeconds ? Math.ceil(duration - progressSeconds) : 0;
      const minutesRemaining = Math.floor(timeRemaining / 60);
      const secondsRemaining = timeRemaining - (minutesRemaining * 60);
      out.remainingTime = `-${minutesRemaining}:${secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}`;

      out.trackProgress = Math.ceil((progressSeconds / duration) * 100);
    }
    return out;
  }, [duration, progressSeconds]);

  return (
    <>
      {
        fileUrl && (
          <audio
            ref={refAudio}
          >
            <source
              src={fileUrl}
            />
          </audio>
        )
      }
      <MainContainer>
        <Subtitle>
          {t('recordingsListen:title')}
        </Subtitle>
        <Subtitle>
          {t('recordingsListen:subtitle')}
        </Subtitle>
        <PlayerContainer>
          <PlayerContainerTop>
            <PlayerPlayContainer
              onClick={handlePlay}
            >
              <PlayerPlay
                src={PlaySVG}
              />
            </PlayerPlayContainer>
            <PlayerTopMiddle>
              <PlayerFileName>
                {fileName}
              </PlayerFileName>
              <PlayerFileSize>
                {fileSize}
              </PlayerFileSize>
            </PlayerTopMiddle>
            <PlayerCrossContainer
              onClick={handleRemoveFile}
            >
              <PlayerCross
                src={CrossSVG}
              />
            </PlayerCrossContainer>
          </PlayerContainerTop>
          <PlayerContainerBottom>
            <PlayerBottomTop>
              <PlayerBottomTrack />
              <PlayerBottomThumb
                playing={playing}
                progress={trackProgress}
              />
            </PlayerBottomTop>
            <PlayerBottomBottom>
              <PlayerTimeIndicator>
                {currentTime}
              </PlayerTimeIndicator>
              <PlayerTimeIndicator>
                {remainingTime}
              </PlayerTimeIndicator>
            </PlayerBottomBottom>
          </PlayerContainerBottom>
        </PlayerContainer>
      </MainContainer>
      {activeStep && (
        <Portal>
          <WizardButtons
            invert
            leftLabel={t('recordingsListen:next')}
            leftHandler={handleNext}
          />
        </Portal>
      )}
    </>
  );
};

export default React.memo(ListenAudio);
