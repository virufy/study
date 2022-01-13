import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import usePortal from 'react-useportal';
import { Trans, useTranslation } from 'react-i18next';
import axios from 'axios';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers';
import { ErrorMessage } from '@hookform/error-message';
import * as Yup from 'yup';

// Update Action
import { updateAction } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Helpers
import { scrollToTop } from 'helper/scrollHelper';
import { getPatientId } from 'helper/stepsDefinitions';

// Components
import WizardButtons from 'components/WizardButtons';

// Style
import {
  QuestionInput, CustomPurpleText, BoldBlackText, Title, ImportantNote, MainContainer, BeforeSubmitText,
} from '../style';

const schema = Yup.object({
  accessCode: Yup.string().required(),
}).defined();

type PredictionResult1Type = Yup.InferType<typeof schema>;

const predictionEndpointUrl = 'https://demo.virufy.dev/predict' || '';

declare interface AudioInfoProp {
  breath: string;
  cough: string;
  voice: string;
}

const PredictionResult1 = ({
  previousStep,
  nextStep,
  storeKey,
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
  const { state/* , actions */ } = useStateMachine(updateAction(storeKey));
  const patientId = getPatientId();

  // States
  const [activeStep, setActiveStep] = React.useState(true);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState<boolean>(false);

  // Location
  const location = useLocation<{ audioInfo: AudioInfoProp }>();

  const coughAudioPath: string = location?.state?.audioInfo?.cough;

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const {
    isValid,
  } = formState;

  const onSubmit = async (value: any) => {
    try {
      setSubmitError(null);
      setProcessing(true);
      const url = `${predictionEndpointUrl}?file_path=${encodeURIComponent(coughAudioPath)}&access_code=${encodeURIComponent(value.accessCode)}`;
      const predictionResult = await axios.post(url);
      if (predictionResult.data) {
        setProcessing(false);
        if (nextStep) {
          setActiveStep(false);
          history.push(nextStep, {
            prediction: predictionResult.data.prediction,
            errorCode: predictionResult.data.error_code,
          });
        }
      } else {
        setProcessing(false);
      }
    } catch (error) {
      console.log('Error', error);
      setSubmitError(t('beforeSubmit:submitError'));
    }
  };

  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
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
        {t('main:hello', 'Hello,')}
      </CustomPurpleText>
      <CustomPurpleText left mt={0}>
        {`${t('main:patient', 'Patient')} ${patientId}`}
      </CustomPurpleText>
      <BoldBlackText>
        {t('main:accessCode', 'Access Code')}
      </BoldBlackText>
      <Controller
        control={control}
        name="accessCode"
        defaultValue=""
        render={({ onChange, value, name }) => (
          <QuestionInput
            name={name}
            value={value}
            onChange={onChange}
            type="text"
            placeholder={t('main:enterAccessCode', 'Enter Access Code')}
            autoComplete="Off"
          />
        )}
      />
      <ImportantNote>
        <Trans i18nKey="main:note">
          <strong>Please note:</strong> This form is for data collection only. It will not predict your COVID-19
          status or diagnose any disease, disorder, or other health condition. Virufy is conducting research and
          will use the information you provide for that research only. Virufy will not take place of a doctor and
          would like to remind you it is your responsibility to seek medical advice from your doctor.
        </Trans>
      </ImportantNote>
      {/* Bottom Buttons */}
      <p><ErrorMessage errors={errors} name="name" /></p>
      {activeStep && (
        <Portal>
          {submitError && (
            <BeforeSubmitText>
              {submitError}
            </BeforeSubmitText>
          )}
          <WizardButtons
            leftLabel={t('beforeSubmit:submitButton')}
            leftHandler={handleSubmit(onSubmit)}
            leftDisabled={!isValid || processing}
            invert
          />
        </Portal>
      )}
    </MainContainer>
  );
};

export default React.memo(PredictionResult1);
