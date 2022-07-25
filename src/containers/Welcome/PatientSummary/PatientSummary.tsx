import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Header Control
import { useTranslation } from 'react-i18next';

// Hooks
import useAxios from 'hooks/useAxios';
import useHeaderContext from 'hooks/useHeaderContext';

// Helpers
import { getPatientId, getCountry, allowConsenstIn } from 'helper/stepsDefinitions';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeStep, setActiveStep] = useState(true);
  const [loading, setLoading] = useState(true);
  const [patientInformation, setPatientInformation] = useState({
    questionary: false,
    shortQuestionary: false,
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
  const country = getCountry();

  useEffect(() => {
    if (!patientId) {
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
  const enableScreeningResults = patientInformation.audioCollection && patientInformation.audioInfo;

  const handleNextQuestionnaire = React.useCallback(() => {
    if (!patientInformation.questionary && !patientInformation.shortQuestionary) {
      if (allowConsenstIn.includes(country)) {
        history.push('/submit-steps/questionary/consent');
      } else {
        history.push('/submit-steps/questionary/step2');
      }
    }
  }, [country, history, patientInformation.questionary, patientInformation.shortQuestionary]);

  const handleNextShortQuestionnaire = React.useCallback(() => {
    if (!patientInformation.shortQuestionary && !patientInformation.questionary) {
      if (allowConsenstIn.includes(country)) {
        history.push('/submit-steps/shortQuestionary/consent');
      } else {
        history.push('/submit-steps/shortQuestionary/step1');
      }
    }
  }, [country, history, patientInformation.questionary, patientInformation.shortQuestionary]);

  const handleNextAudioCollection = React.useCallback((isShortAudio: boolean) => {
    if (!patientInformation.audioCollection) {
      history.push('/submit-steps/step-record/cough', { isShortAudioCollection: isShortAudio });
    }
  }, [history, patientInformation.audioCollection]);

  const handleNextTestResults = React.useCallback(() => {
    if (!patientInformation.testResult) {
      history.push('/submit-steps/questionary/step1b');
    }
  }, [history, patientInformation.testResult]);

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
              <OptionsHeader
                onClick={handleNextQuestionnaire}
                isButton={(!patientInformation.questionary && !patientInformation.shortQuestionary)}
              >
                {t('main:questionnaire', 'Questionnaire')}
                {(patientInformation.shortQuestionary || patientInformation.questionary)
                  ? <CheckCircle /> : <ChevronRight />}
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

            {
              (country === 'Colombia') && (
                <OptionsContainer>
                  <OptionsHeader
                    onClick={handleNextShortQuestionnaire}
                    isButton={(!patientInformation.questionary && !patientInformation.shortQuestionary)}
                  >
                    {t('main:shortQuestionnaire', 'Short Questionnaire')}
                    {(patientInformation.shortQuestionary || patientInformation.questionary) ? <CheckCircle />
                      : <ChevronRight />}
                  </OptionsHeader>
                  {patientInformation.shortQuestionary && (
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
              )
            }

            <OptionsContainer>
              <OptionsHeader
                onClick={() => handleNextAudioCollection(false)}
                isButton={!patientInformation.audioCollection}
              >
                {t('main:audioCollection', 'Audio Collection')}
                {patientInformation.audioCollection ? <CheckCircle />
                  : <ChevronRight />}
              </OptionsHeader>
            </OptionsContainer>

            {
              (country === 'Colombia') && (
                <OptionsContainer>
                  <OptionsHeader
                    onClick={() => handleNextAudioCollection(true)}
                    isButton={(!patientInformation.audioCollection)}
                  >
                    {t('main:shortAudioCollection', 'Short Audio Collection')}
                    {(patientInformation.audioCollection) ? <CheckCircle />
                      : <ChevronRight />}
                  </OptionsHeader>
                </OptionsContainer>
              )
            }

            <OptionsContainer>
              <OptionsHeader
                onClick={handleNextScreeningResults}
                isDisabled={!enableScreeningResults}
                isButton={!!enableScreeningResults}
              >
                {t('main:screeningResults', 'Screening Results')}
                <ChevronRight />
              </OptionsHeader>
            </OptionsContainer>

            <OptionsContainer>
              <OptionsHeader
                onClick={handleNextTestResults}
                isButton={!patientInformation.testResult}
              >
                {t('main:testResults', 'Test Results')}
                {patientInformation.testResult ? <CheckCircle /> : <ChevronRight />}
              </OptionsHeader>
            </OptionsContainer>

          </>
        )}

      </WelcomeContent>
    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(PatientSummary);
