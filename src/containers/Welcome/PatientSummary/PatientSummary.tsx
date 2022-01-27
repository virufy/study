import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';

// Header Control
import { useTranslation } from 'react-i18next';

// Hooks
import useAxios from 'hooks/useAxios';
import useHeaderContext from 'hooks/useHeaderContext';

// Helpers
import { getPatientId } from 'helper/stepsDefinitions';
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  WelcomeContent,
  WelcomeStyledFormAlternative,
  CustomPurpleText,
  OptionsHeader,
  OptionsContainer,
  OptionsBody,
  OptionsText,
  ChevronRight,
  CheckCircle,
} from '../style';

const PatientSummary = (p: Wizard.StepProps) => {
  const patientId = getPatientId();
  const { state } = useStateMachine();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeStep, setActiveStep] = useState(true);
  const [loading, setLoading] = useState(true);
  const [patientInformation, setPatientInformation] = useState({
    questionary: false,
    age: undefined,
    gender: '',
    audioCollection: false,
    audioInfo: null,
    testResult: false,
  });
  const {
    setType, setDoGoBack, setTitle, setLogoSize,
  } = useHeaderContext();
  const { t } = useTranslation();
  const history = useHistory();
  const axios = useAxios();

  const currentState = state?.[p.storeKey];

  useEffect(() => {
    if (!currentState?.patientId) {
      history.replace('');
    } else {
      (async () => {
        const res = await axios.get(`/patient/${patientId}`)
          .catch(() => {
            setLoading(false);
            return {
              status: 404,
              data: {},
            };
          });
        if (res.status === 200) {
          setPatientInformation(res.data);
          setLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line max-len
  const enableScreeningResults = patientInformation.questionary && patientInformation.audioCollection && patientInformation.audioInfo && patientInformation.testResult;

  const handleNextQuestionnaire = React.useCallback(() => {
    history.push('/submit-steps/questionary/step2');
  }, [history]);

  const handleNextAudioCollection = React.useCallback(() => {
    history.push('/submit-steps/step-record/cough');
  }, [history]);

  const handleNextTestResults = React.useCallback(() => {
    history.push('/submit-steps/questionary/step1b');
  }, [history]);

  const handleNextScreeningResults = React.useCallback(() => {
    if (enableScreeningResults) {
      history.push('/submit-steps/prediction-result1', { audioInfo: patientInformation.audioInfo });
    }
  }, [enableScreeningResults, history, patientInformation]);

  const doBack = useCallback(() => {
    if (p.previousStep) {
      setActiveStep(false);
      history.push(p.previousStep);
    } else {
      history.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {loading ? (
          <CustomPurpleText left mt={0}>Loading....</CustomPurpleText>
        ) : (
          <>
            <OptionsContainer isFirst>
              <OptionsHeader onClick={handleNextQuestionnaire}>{t('main:questionnaire', 'Questionnaire')}
                {patientInformation.questionary ? <CheckCircle /> : <ChevronRight />}
              </OptionsHeader>
              {patientInformation.questionary && (
                <OptionsBody>
                  <OptionsText>
                    {t('questionary:age', 'Age: ')} <strong>{patientInformation.age}</strong>
                  </OptionsText>
                  <OptionsText>
                    {t('questionary:gender.gender', 'Gender: ')} <strong>{t(`questionary:gender.options.${patientInformation.gender}`, `${patientInformation.gender}`)}</strong>
                  </OptionsText>
                </OptionsBody>
              )}
            </OptionsContainer>

            <OptionsContainer>
              <OptionsHeader onClick={handleNextAudioCollection}>
                {t('main:audioCollection', 'Audio Collection')}
                {patientInformation.audioCollection ? <CheckCircle />
                  : <ChevronRight />}
              </OptionsHeader>
            </OptionsContainer>

            <OptionsContainer>
              <OptionsHeader onClick={handleNextTestResults}>
                {t('main:testResults', 'Test Results')}
                {patientInformation.testResult ? <CheckCircle /> : <ChevronRight />}
              </OptionsHeader>
            </OptionsContainer>

            <OptionsContainer>
              <OptionsHeader onClick={handleNextScreeningResults} isDisabled={!enableScreeningResults}>
                {t('main:screeningResults', 'Screening Results')}
                <ChevronRight />
              </OptionsHeader>
            </OptionsContainer>
          </>
        )}

      </WelcomeContent>
    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(PatientSummary);
