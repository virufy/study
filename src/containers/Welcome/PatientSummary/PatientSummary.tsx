import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Header Control
import { useTranslation } from 'react-i18next';
import useHeaderContext from 'hooks/useHeaderContext';

// Helpers
import { getPatientId } from 'helper/stepsDefinitions';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  WelcomeContent,
  WelcomeStyledFormAlternative,
  CustomPurpleText,
  OptionsHeader,
  OptionsContainer,
  OptionsBody,
  ChevronRight,
  CheckCircle,
} from '../style';

const PatientSummary = (p: Wizard.StepProps) => {
  const patientId = getPatientId();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeStep, setActiveStep] = useState(true);
  const {
    setType, setDoGoBack, setTitle, setLogoSize,
  } = useHeaderContext();

  const history = useHistory();

  // FALSO LLAMADO AL BACK

  const questionaryBack = true;
  const age = 22;
  const gender = 'Female';

  const handleNextQuestionnaire = React.useCallback(() => {
    history.push('/submit-steps/questionary/step2');
  }, [history]);

  const handleNextAudioCollection = React.useCallback(() => {
    history.push('/submit-steps/step-record/cough');
  }, [history]);

  const handleNextTestResults = React.useCallback(() => {
    history.push('/submit-steps/questionary/step1b');
  }, [history]);

  const doBack = useCallback(() => {
    if (p.previousStep) {
      setActiveStep(false);
      history.push(p.previousStep);
    } else {
      history.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();

  useEffect(() => {
    scrollToTop();
    setDoGoBack(() => doBack);
    setTitle('');
    setType('tertiary');
    setLogoSize('regular');
  }, [doBack, setDoGoBack, setType, setTitle, setLogoSize, t]);

  return (
    <WelcomeStyledFormAlternative>
      <WelcomeContent mt={20}>
        <CustomPurpleText isLight left mb={5}>
          {t('main:hello', 'Hello,')}
        </CustomPurpleText>
        <CustomPurpleText left mt={0}>
          {`${t('main:patient', 'Patient')} ${patientId}`}
        </CustomPurpleText>

        <OptionsContainer isFirst>
          <OptionsHeader>{t('main:questionnaire', 'Questionnaire')}
            {questionaryBack ? <CheckCircle /> : <ChevronRight onClick={handleNextQuestionnaire} />}
            {questionaryBack && <OptionsBody>Age: {age} Gender: {gender} </OptionsBody>}
          </OptionsHeader>
        </OptionsContainer>

        <OptionsContainer>
          <OptionsHeader>
            {t('main:audioCollection', 'Audio Collection')}<ChevronRight onClick={handleNextAudioCollection} />
          </OptionsHeader>
        </OptionsContainer>

        <OptionsContainer>
          <OptionsHeader>
            {t('main:testResults', 'Test Results')}<ChevronRight onClick={handleNextTestResults} />
          </OptionsHeader>
        </OptionsContainer>
      </WelcomeContent>
    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(PatientSummary);
