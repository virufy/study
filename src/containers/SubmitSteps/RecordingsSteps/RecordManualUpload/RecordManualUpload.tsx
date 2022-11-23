import React, { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation } from 'react-i18next';

// Form
import { Controller, useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers';
import { isIOS, isSafari } from 'react-device-detect';
import Yup from 'utils/yup';

// Components
import WizardButtons from 'components/WizardButtons';
import { TitleBlack } from 'components/Texts';

// Modals
import RecordErrorModal from 'modals/RecordErrorModal';

// Hooks
import useHeaderContext from 'hooks/useHeaderContext';
import { useModal } from 'hooks/useModal';

// Utils
import { updateAction } from 'utils/wizard';
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  MainContainer,
  UploadContainer,
  UploadInput,
  UploadButton,
  CloudsSVG,
  ArrowUp,
} from './style';

const audioMaxSizeInMb = 5;
const audioMinLength: CommonJSON<number> = {
  recordYourBreath: 5,
  recordYourSpeech: 5,
  recordYourCough: 3,
}; // in seconds

const mimeTypes = 'audio/wav,audio/wave,audio/wav,audio/x-wav,audio/x-pn-wav,audio/mp3,audio/ogg';

mimeTypes.concat(isSafari || isIOS ? '' : 'audio/flac');

const schema = Yup.object({
  uploadedFile: Yup.mixed()
    .required('ERROR.FILE_REQUIRED')
  // @ts-ignore
    .validateAudioSize(audioMaxSizeInMb)
  // @ts-ignore
    .when('$_currentLogic', (value: string, _schema: Yup.MixedSchema) => _schema.validateAudioLength(audioMinLength[value] || 5)),
}).defined();

const RecordManualUpload = ({
  storeKey,
  previousStep,
  nextStep,
  metadata,
}: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const {
    setDoGoBack, setTitle, setSubtitle, setType,
  } = useHeaderContext();
  const history = useHistory();
  const { state, action } = useStateMachine(updateAction(storeKey));
  const { isOpen, openModal, closeModal } = useModal();
  const inputUpload = useRef<HTMLInputElement>(null);
  const {
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey]?.[metadata?.currentLogic],
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  const location = useLocation<{ isShortAudioCollection: boolean }>();
  const isShortAudioCollection = location?.state?.isShortAudioCollection || false;

  // States
  const [activeStep, setActiveStep] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState('');

  // Handlers
  const handleNext = React.useCallback((values: File) => {
    if (nextStep) {
      action({
        [metadata?.currentLogic]: {
          recordingFile: null,
          uploadedFile: values,
        },
      });
      setActiveStep(false);
      history.push(nextStep, { from: 'step-manual-upload', isShortAudioCollection });
    }
  }, [nextStep, action, metadata, history, isShortAudioCollection]);

  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
    if (previousStep) {
      history.push(previousStep, { isShortAudioCollection });
    } else {
      history.goBack();
    }
  }, [history, previousStep, isShortAudioCollection]);

  const handleUpload = React.useCallback(e => {
    schema.validate({ uploadedFile: e }).then(() => {
      handleNext(e);
    }).catch(err => {
      if (err.errors[0] === 'ERROR.FILE_SIZE') {
        setErrorMsg(t('recordingsRecordManual:fileSizeTooBig'));
      } if (err.errors[0] === 'ERROR.FILE_REQUIRED') {
        setErrorMsg(t('recordingsRecordManual:fileRequired'));
      } else {
        setErrorMsg(t('recordingsRecordManual:fileDurationTooShort'));
      }
      openModal();
    });
  }, [handleNext, t, openModal]);

  // Effects
  useEffect(() => {
    scrollToTop();
    setTitle(t('recordingsRecordManual:header'));
    setType('primary');
    setSubtitle('');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, setSubtitle, t]);

  return (
    <>
      <MainContainer>
        <TitleBlack>
          {t('recordingsRecordManual:micError')}
        </TitleBlack>
        <CloudsSVG />
        <Controller
          control={control}
          name="uploadedFile"
          render={({ name }) => (
            <UploadContainer>
              <UploadButton htmlFor="uploaded-file" />
              <ArrowUp />
              <UploadInput
                ref={inputUpload}
                id="uploaded-file"
                type="file"
                name={name}
                accept={mimeTypes}
                onChange={e => handleUpload(e.currentTarget.files?.[0])}
              />
            </UploadContainer>
          )}
        />
      </MainContainer>
      <RecordErrorModal
        isOpen={isOpen}
        modalTitle="Oops."
        onConfirm={closeModal}
      >
        {errorMsg}
      </RecordErrorModal>
      {/* Bottom Buttons */}
      {activeStep && (
        <Portal>
          <WizardButtons
            invert
            leftLabel={t('recordingsRecordManual:uploadFile')}
            leftHandler={() => inputUpload.current?.click()}
          />
        </Portal>
      )}
    </>
  );
};

export default React.memo(RecordManualUpload);
