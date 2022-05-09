import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';
import useAxios from 'hooks/useAxios';

// Helpers
import { scrollToTop } from 'helper/scrollHelper';
import { getPatientId } from 'helper/stepsDefinitions';

// Style
import {
  CustomPurpleText, Title, MainContainer, ImageProcessing,
} from '../style';

declare interface AudioInfoProp {
  breath: string;
  cough: string;
  voice: string;
}

const PredictionResult1 = ({
  previousStep,
  nextStep,
}: Wizard.StepProps) => {
  // Hooks
  const {
    setDoGoBack, setTitle, setType, setLogoSize,
  } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const patientId = getPatientId();
  const axios = useAxios();

  useEffect(() => {
    if (!patientId || !nextStep) {
      history.replace('');
    } else {
      (async () => {
        const res = await axios.get(`/patient/${patientId}/result`)
          .catch(() => ({
            status: 404,
            data: {
              result: 'unknown',
              errorCode: 'unknown_error',
            },
          }));
        history.push(nextStep, {
          prediction: res.data.result,
          errorCode: res.data.error_code,
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDoBack = React.useCallback(() => {
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  // Effects
  useEffect(() => {
    scrollToTop();
    setDoGoBack(() => handleDoBack);
    setTitle('');
    setType('tertiary');
    setLogoSize('regular');
  }, [handleDoBack, setDoGoBack, setType, setTitle, setLogoSize, t]);

  return (
    <MainContainer>
      <Title>{t('main:screeningResults', 'Screening Results')}</Title>
      <CustomPurpleText isLight left mb={5}>
        {t('predictionScreen:titleProcessing', 'Processing...')}
      </CustomPurpleText>
      <ImageProcessing />
    </MainContainer>
  );
};

export default React.memo(PredictionResult1);
