import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

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

// Utils
import { scrollToTop } from 'helper/scrollHelper';
import { getCountry } from 'helper/stepsDefinitions';
import { doSubmit } from 'helper/submitHelper';

// Components
import WizardButtons from 'components/WizardButtons';
import Recaptcha from 'components/Recaptcha';
import ProgressIndicator from 'components/ProgressIndicator';

// Styles
import {
  QuestionText, MainContainer, QuestionInput, TempBeforeSubmitError,
} from '../style';

const schema = Yup.object({
  symptomsStartedDate: Yup.string().required(),
}).defined();

type Step4bType = Yup.InferType<typeof schema>;

const Step4b = ({
  previousStep,
  nextStep,
  storeKey,
  metadata,
}: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const { setDoGoBack, setTitle, setType } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { state, action } = useStateMachine(updateAction(storeKey));
  const country = getCountry();
  const [cookies] = useCookies(['virufy-study-user']);

  const userCookie = cookies['virufy-study-user'];

  // States
  const [activeStep, setActiveStep] = React.useState(true);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
  const [recaptchaAvailable, setRecaptchaAvailable] = React.useState(true);
  const isShortQuestionary = metadata?.isShortQuestionary;

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    resolver: yupResolver(schema),
    context: {
      country,
    },
  });
  const { errors, isSubmitting, isValid } = formState;

  // Memos
  const renderCaptcha = React.useMemo(() => {
    if (isShortQuestionary || country === 'Japan') {
      if (submitError) {
        return (
          <>
            <Recaptcha onChange={setCaptchaValue} setRecaptchaAvailable={setRecaptchaAvailable} />
            <TempBeforeSubmitError>
              {submitError}
            </TempBeforeSubmitError>
          </>
        );
      }
      return <Recaptcha onChange={setCaptchaValue} setRecaptchaAvailable={setRecaptchaAvailable} />;
    }
    return null;
  }, [country, isShortQuestionary, submitError]);

  // Handlers
  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  const onSubmit = async (values: Step4bType) => {
    if (country === 'Japan') {
      if (values) {
        await doSubmit({
          setSubmitError: () => setSubmitError(null),
          state: {
            ...state,
            'submit-steps': {
              ...state['submit-steps'],
              ...values,
            },
          },
          captchaValue,
          action,
          nextStep,
          setActiveStep,
          history,
          userCookie,
        });
      }
    }
    if (values && country !== 'Japan') {
      action(values);
      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  const onSubmitPatientShortQuestionnaire = () => {
    if (nextStep) {
      setActiveStep(false);
      history.push(nextStep);
    }
  };

  const getLeftLabel = () => {
    if (isShortQuestionary) {
      if (isSubmitting) {
        return t('questionary:submitting');
      }
      return t('beforeSubmit:submitButton');
    }
    return t('questionary:nextButton');
  };

  // Effects
  useEffect(() => {
    if (!captchaValue) {
      setSubmitError(null);
    }
  }, [captchaValue]);

  useEffect(() => {
    scrollToTop();
    setTitle(t('questionary:symptomsDateTitle'));
    setType('primary');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, t]);

  return (
    <MainContainer>
      {
        country === 'Japan' && (
          <ProgressIndicator
            currentStep={metadata?.current}
            totalSteps={metadata?.total}
            progressBar
          />
        )
      }
      <QuestionText extraSpace first>
        {t('questionary:symptomsDate')}
      </QuestionText>
      <Controller
        control={control}
        name="symptomsStartedDate"
        defaultValue=""
        render={({ onChange, value, name }) => (
          <QuestionInput
            name={name}
            value={value}
            onChange={onChange}
            type="number"
            placeholder={t('questionary:enterDays')}
            autoComplete="Off"
          />
        )}
      />

      {/* Bottom Buttons */}
      <p><ErrorMessage errors={errors} name="name" /></p>
      {activeStep && (
        <Portal>
          {renderCaptcha}
          <WizardButtons
            leftLabel={getLeftLabel()}
            leftHandler={isShortQuestionary ? handleSubmit(onSubmitPatientShortQuestionnaire) : handleSubmit(onSubmit)}
            leftDisabled={isShortQuestionary || country === 'Japan' ? (isSubmitting || (recaptchaAvailable && !captchaValue)) || !isValid : !isValid}
            invert
          />
        </Portal>
      )}
    </MainContainer>
  );
};

export default React.memo(Step4b);
