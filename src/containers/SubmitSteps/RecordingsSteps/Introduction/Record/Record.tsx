import React from 'react';
import usePortal from 'react-useportal';
import { useTranslation } from 'react-i18next';

// Form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import Yup from 'utils/yup';

// Components
import MicRecorder from 'components/MicRecorder';
import WizardButtons from 'components/WizardButtons';

// Images
import UploadSVG from 'assets/icons/upload.svg';

// Styles
import {
  MainContainer,
  UploadContainer,
  UploadImage,
  UploadText,
  MicContainer,
} from './style';

const audioMaxSizeInMb = 5;
const audioMinLength: CommonJSON<number> = {
  recordYourBreath: 5,
  recordYourSpeech: 5,
  recordYourCough: 3,
}; // in seconds

const schema = Yup.object({
  recordingFile: Yup.mixed()
    .required('ERROR.FILE_REQUIRED')
    // @ts-ignore
    .validateAudioSize(audioMaxSizeInMb)
    // @ts-ignore
    .when('$_currentLogic', (value: string, _schema: Yup.MixedSchema) => _schema.validateAudioLength(audioMinLength[value] || 5)),
}).defined();

type RecordType = Yup.InferType<typeof schema>;

interface RecordProps {
  // isCoughLogic: boolean,
  onNext: (values: RecordType) => void;
  onManualUpload: () => void;
  defaultValues: RecordType;
  currentLogic: string;
  action:any;
  isShortAudioCollection?: boolean;
}

const Record = ({
  onNext,
  onManualUpload,
  defaultValues,
  currentLogic,
  action,
  isShortAudioCollection,
}: RecordProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo:
      document && (document.getElementById('wizard-buttons') as HTMLDivElement),
  });
  const {
    handleSubmit, control, getValues, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues,
    context: {
      _currentLogic: currentLogic,
    },
    resolver: yupResolver(schema),
  });

  const { t } = useTranslation();

  const { isValid } = formState;

  // Refs
  const micKey = React.useRef<number>(1);

  const onManualUploadWithFile = () => {
    action({
      [currentLogic]: {
        recordingFile: getValues('recordingFile') || null,
        uploadedFile: null,
      },
    });
    onManualUpload?.();
  };

  return (
    <>
      <MainContainer>
        <MicContainer>
          <Controller
            control={control}
            name="recordingFile"
            render={({ onChange }) => (
              <MicRecorder
                key={micKey.current} // On delete, easy re-mount a new mic recorder
                onNewRecord={onChange}
                recordingFile={defaultValues?.recordingFile}
                minTimeInSeconds={audioMinLength[currentLogic]}
                isShortAudioCollection={isShortAudioCollection}
              />
            )}
          />
        </MicContainer>

        <Portal>
          <WizardButtons
            invert
            leftLabel={t('recordingsRecord:next')}
            leftDisabled={!isValid}
            leftHandler={handleSubmit(onNext)}
          />
          <UploadContainer onClick={onManualUploadWithFile}>
            <UploadImage src={UploadSVG} />
            <UploadText>{t('recordingsRecord:upload')}</UploadText>
          </UploadContainer>
        </Portal>

      </MainContainer>
    </>
  );
};

export default React.memo(Record);
