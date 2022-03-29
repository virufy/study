import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation, Trans } from 'react-i18next';

// Components
import WizardButtons from 'components/WizardButtons';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  MainContainer, Title, ImportantNote, ResultTitle, ResultNote, BeforeSubmitText,
} from '../style';

// Theme
import { colors } from '../../../../theme';

const PredictionResult2 = ({
  previousStep,
  nextStep,
  // storeKey,
}: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const {
    setDoGoBack, setTitle, setType, setLogoSize,
  } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation<{ errorCode: string, prediction: string }>();

  const prediction: string = location?.state?.prediction;
  const errorCode: string = location?.state?.errorCode;

  // Handlers
  const handleSubmitAnotherCough = React.useCallback(() => {
    if (nextStep) {
      history.push(nextStep);
    } else {
      history.replace('');
    }
  }, [history, nextStep]);

  const handleDoBack = React.useCallback(() => {
    // setActiveStep(false);
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  // Effects
  React.useEffect(() => {
    scrollToTop();
    setDoGoBack(() => handleDoBack);
    setTitle('');
    setType('tertiary');
    setLogoSize('regular');
  }, [handleDoBack, setDoGoBack, setType, setTitle, setLogoSize, t]);

  const renderResult = React.useMemo(() => {
    if (errorCode === 'everything_ok') {
      if (prediction === 'positive') {
        return (
          <>
            <ResultTitle color={colors.red}>
              {t('predictionResult:result_positive')}
            </ResultTitle>
            <ResultNote>
              <Trans i18nKey="predictionResult:result_positive_text">
                Your voice has indicators of COVID-19.
                <strong>Please contact your healthcare professional</strong> and take additional precautions.
              </Trans>
            </ResultNote>
          </>
        );
      }
    }
    return (
      <>
        <ResultTitle color={colors.black}>
          {t('predictionResult:result_unable')}
        </ResultTitle>
        <ResultNote>
          <Trans i18nKey="predictionResult:result_unable_text">
            Our algorithm is not able to determine your COVID-19 status. <strong>Please submit another cough.</strong>
          </Trans>
        </ResultNote>
      </>
    );
  }, [errorCode, prediction, t]);

  return (
    <MainContainer>
      {/* Title */}
      <Title>
        {t('predictionResult:predictionResultTitle')}
      </Title>
      {renderResult}
      <ImportantNote>
        <Trans i18nKey="predictionResult:important_note">
          <strong>Important note:</strong> This app will not predict your COVID-19 status or diagnose any disease,
          disorder, or other health condition. Virufy is conducting research and will use the
          information you provide for that research only. Virufy will not take place of a doctor and would
          like to remind you it is your responsibility to seek medical advice from your doctor.
        </Trans>
      </ImportantNote>

      <Portal>
        {(errorCode !== 'everything_ok') && (
          <BeforeSubmitText>
            {`Error Code: ${errorCode}`}
          </BeforeSubmitText>
        )}
        <WizardButtons
          invert
          leftLabel={t('thankyou:returnButton')}
          leftHandler={handleSubmitAnotherCough}
          leftDisabled={false}
        />
      </Portal>
    </MainContainer>
  );
};

export default React.memo(PredictionResult2);
