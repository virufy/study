import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

// Form
import { useStateMachine } from 'little-state-machine';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import FullWidthDiv from 'components/FullWidthDiv';
import ProgressIndicator from 'components/ProgressIndicator';

// Utils
import { scrollToTop } from 'helper/scrollHelper';
import { updateAction } from 'utils/wizard';

// Images
import Record from './Record';

// Styles
import {
  MainContainer,
  Text,
  TextSpeech,
  CoughLeft,
  SocialDistancing,
  InstructionTitle,
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
  const { setDoGoBack, setTitle } = useHeaderContext();
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
    setDoGoBack(() => handleDoBack);
  }, [isCoughLogic, setTitle, handleDoBack, setDoGoBack, t]);

  return (
    <>
      <MainContainer>
        <ProgressIndicator
          currentStep={metadata?.progressCurrent || (isCoughLogic ? 1 : 2)}
          totalSteps={metadata?.progressTotal || 4}
        />
        <InstructionTitle>{t('recordingsIntroduction:recordCough.title')}</InstructionTitle>
        {
          isCoughLogic ? (
            <>
              <Text>
                <Trans i18nKey="recordingsIntroduction:recordCough.intro1">
                  Find a <strong>quiet environment</strong> at least <strong>20 ft (6m)</strong>
                  away from others and wear a cloth or surgical mask. If you are feeling ill, please sit down.
                </Trans>
              </Text>
              <SocialDistancing />
              <Text>
                <Trans i18nKey="recordingsIntroduction:recordCough.intro2">
                  Hold your device <strong>1-2 ft (30-60 cm)</strong> away from your mouth and
                  <strong>do not obstruct</strong>
                  or cover your device with plastic. Do not cough violently or too forcefully.
                </Trans>
              </Text>
              <CoughLeft />
            </>
          ) : (
            <>
              <TextSpeech>
                {t('recordingsIntroduction:recordSpeech.intro1')}
              </TextSpeech>
              <FullWidthDiv>
                <CoughLeft />
              </FullWidthDiv>
            </>
          )
        }

      </MainContainer>

      <Record
        // isCoughLogic={isCoughLogic}
        defaultValues={state?.[storeKey]?.[metadata?.currentLogic]}
        onManualUpload={handleManualUpload}
        onNext={handleNext}
        currentLogic={metadata?.currentLogic || ''}
        action={action}
      />
    </>
  );
};

export default React.memo(Introduction);
