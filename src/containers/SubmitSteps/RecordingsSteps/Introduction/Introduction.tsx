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

  const isBreathLogic = React.useMemo(
    () => (metadata ? metadata.currentLogic === 'recordYourBreath' : false),
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
    } else if (isBreathLogic) {
      setTitle(t('recordingsIntroduction:recordBreath.header'));
    } else {
      setTitle(t('recordingsIntroduction:recordSpeech.header'));
    }
    setType('primary');
    setSubtitle(t('recordingsIntroduction:recordCough:title'));
    setDoGoBack(() => handleDoBack);
  }, [isCoughLogic, isBreathLogic, setTitle, setSubtitle, setType, handleDoBack, setDoGoBack, t]);

  const [renderInstrucion2, renderInstrucion3] = React.useMemo(() => {
    if (isCoughLogic) {
      return ([
        <Trans i18nKey="recordingsIntroduction:recordCough.intro2Cough">
          Hold your device <strong>1-2 ft (30-60 cm)</strong>
          away from your mouth and <strong>do not obstruct</strong>
          or cover your device with plastic. Do not cough violently or too forcefully.
        </Trans>,
        <Trans i18nKey="recordingsRecord:textCough">
          Tap the record button and <strong>cough intentionally</strong>
          into the bottom of your phone <strong>3 times</strong> with a
          <strong> deep breath</strong> between each cough. When you are done, tap the stop button.
        </Trans>,
      ]);
    }
    if (isBreathLogic) {
      return ([
        <Trans i18nKey="recordingsIntroduction:recordCough.intro2Breath">
          Hold your device <strong>1-2 ft (30-60 cm)</strong>
          away from your mouth and <strong>do not obstruct</strong>
          or cover your device with plastic. Do not breathe violently or too forcefully.
        </Trans>,
        <Trans i18nKey="recordingsRecord:textBreath">
          Tap the record button and <strong>breathe deeply and loudly</strong> into the bottom of your phone
          <strong>5 times.</strong> When you are done, tap the stop button.
        </Trans>,
      ]);
    }
    return ([
      <Trans i18nKey="recordingsIntroduction:recordCough.intro2Speech">
        Hold your device <strong>1-2 ft (30-60 cm)</strong>
        away from your mouth and <strong>do not obstruct</strong>
        or cover your device with plastic. Do not speak violently or too forcefully.
      </Trans>,
      <Trans i18nKey="recordingsRecord:textSpeech">
        Tap the record button below and <strong>say a sustained ‘aaaaah’ for at least 5 seconds.</strong>
        When you are done, tap the stop button.
      </Trans>,

    ]);
  }, [isBreathLogic, isCoughLogic]);

  return (
    <MainContainer>
      <InstructionContainer>
        <WelcomeBullets>
          <BulletIndicator>1</BulletIndicator>
        </WelcomeBullets>
        <BlackText>
          <Trans i18nKey="recordingsIntroduction:recordCough.intro1">
            Find a <strong>quiet environment</strong> at least
            <strong>20 ft (6m)</strong> away from others and wear a cloth or surgical mask.
            If you are feeling ill, please sit down.
          </Trans>
        </BlackText>
      </InstructionContainer>
      <SocialDistancing />
      <InstructionContainer>
        <WelcomeBullets>
          <BulletIndicator>2</BulletIndicator>
        </WelcomeBullets>
        <BlackText>
          {renderInstrucion2}
        </BlackText>
      </InstructionContainer>
      <CoughLeft />
      <InstructionContainer>
        <WelcomeBullets>
          <BulletIndicator>3</BulletIndicator>
        </WelcomeBullets>
        <BlackText>
          {renderInstrucion3}
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
