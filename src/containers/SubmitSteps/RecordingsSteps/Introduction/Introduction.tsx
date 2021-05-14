import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

// Form
import { useStateMachine } from 'little-state-machine';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import { BlackText } from 'components/Texts';

// Utils
import { scrollToTop } from 'helper/scrollHelper';
import { updateAction } from 'utils/wizard';

// Images
import Record from './Record';

// Styles
import {
  MainContainer,
  InstructionContainer,
  WelcomeBullets,
  BulletIndicator,
  CoughLeft,
  SocialDistancing,
} from './style';

const Introduction = ({
  previousStep,
  nextStep,
  otherSteps,
  metadata,
  storeKey,
}: Wizard.StepProps) => {
  const isCoughLogic = React.useMemo(
    () => (metadata ? metadata.currentLogic === 'recordYourCough' : false),
    [metadata],
  );

  const { state, action } = useStateMachine(updateAction(storeKey));

  // Hooks
  const {
    setDoGoBack, setTitle, setType, setSubtitle,
  } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();

  // Handlers
  const handleDoBack = React.useCallback(() => {
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  const handleManualUpload = React.useCallback(() => {
    if (otherSteps && otherSteps.manualUploadStep) {
      history.push(otherSteps.manualUploadStep);
    }
  }, [otherSteps, history]);

  const handleNext = React.useCallback(
    values => {
      if (nextStep) {
        action({
          [metadata?.currentLogic]: {
            recordingFile: values.recordingFile,
            uploadedFile: null,
          },
        });
        history.push(nextStep, { from: 'step-record' });
      }
    },
    [nextStep, action, metadata, history],
  );

  // Effects
  useEffect(() => {
    scrollToTop();
    if (isCoughLogic) {
      setTitle(t('recordingsIntroduction:recordCough.header'));
    } else {
      setTitle(t('recordingsIntroduction:recordSpeech.header'));
    }
    setType('primary');
    setSubtitle(t('recordingsIntroduction:recordCough:title'));
    setDoGoBack(() => handleDoBack);
  }, [isCoughLogic, setTitle, setSubtitle, setType, handleDoBack, setDoGoBack, t]);

  return (
    <MainContainer>
      <InstructionContainer>
        <WelcomeBullets>
          <BulletIndicator>1</BulletIndicator>
        </WelcomeBullets>
        <BlackText>
          <Trans i18nKey="recordingsIntroduction:recordCough.intro1">
            Find a quiet environment that is 20 feet away from those around you.
          </Trans>
        </BlackText>
      </InstructionContainer>
      <SocialDistancing />
      <InstructionContainer>
        <WelcomeBullets>
          <BulletIndicator>2</BulletIndicator>
        </WelcomeBullets>
        <BlackText>
          <Trans i18nKey="recordingsIntroduction:recordCough.intro2">
            Wear a surgical or cloth mask and hold your device two hands-length away from your face.
          </Trans>
        </BlackText>
      </InstructionContainer>
      <CoughLeft />
      <InstructionContainer>
        <WelcomeBullets>
          <BulletIndicator>3</BulletIndicator>
        </WelcomeBullets>
        <BlackText>
          {
          isCoughLogic ? (
            <Trans i18nKey="recordingsRecord:textCough">
              Click the record button below and
              <strong>cough intentionally three times with a deep breath between each cough.</strong>
              When you are done, tap the stop button.
            </Trans>
          ) : (
            <Trans i18nKey="recordingsRecord:textSpeech">
              Click the record button and cough intentionally <strong>3 times</strong>. When you are done,
              click and Continue.
            </Trans>
          )
          }
        </BlackText>
      </InstructionContainer>
      <Record
        // isCoughLogic={isCoughLogic}
        defaultValues={state?.[storeKey]?.[metadata?.currentLogic]}
        onManualUpload={handleManualUpload}
        onNext={handleNext}
        currentLogic={metadata?.currentLogic || ''}
        action={action}
      />

      <InstructionContainer>
        <WelcomeBullets>
          <BulletIndicator>4</BulletIndicator>
        </WelcomeBullets>
        <BlackText>
          <Trans i18nKey="recordingsRecord:textNext">
            Click continue to proceed.
          </Trans>
        </BlackText>
      </InstructionContainer>

    </MainContainer>
  );
};

export default React.memo(Introduction);
