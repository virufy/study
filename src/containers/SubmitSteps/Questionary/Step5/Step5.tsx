import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation, Trans } from 'react-i18next';
import { useCookies } from 'react-cookie';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers';
import { ErrorMessage } from '@hookform/error-message';
import * as Yup from 'yup';

// Update Action
import { updateAction } from 'utils/wizard';

// Components
import Recaptcha from 'components/Recaptcha';
import ProgressIndicator from 'components/ProgressIndicator';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Hooks
import useCustomProgressBarSteps from 'hooks/useCustomProgressBarSteps';

// Utils
import { scrollToTop } from 'helper/scrollHelper';
import { doSubmit } from 'helper/submitHelper';
import { getPatientId, getCountry } from 'helper/stepsDefinitions';

// Styles
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';
import {
  QuestionText, TempBeforeSubmitError, MainContainer, QuestionAllApply,
} from '../style';

const schema = Yup.object({
  currentRespiratoryCondition: Yup.object({
    selected: Yup.array().required(),
  }),
}).defined();

type Step5Type = Yup.InferType<typeof schema>;

const Step5 = ({
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
  const [cookies] = useCookies(['virufy-study-user']);
  const patientId = getPatientId();
  const country = getCountry();
  const { customSteps } = useCustomProgressBarSteps(storeKey, metadata);

  const userCookie = cookies['virufy-study-user'];

  // States
  const [activeStep, setActiveStep] = React.useState(true);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
  const [recaptchaAvailable, setRecaptchaAvailable] = React.useState(true);

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    resolver: yupResolver(schema),
  });
  const { errors, isSubmitting } = formState;

  const {
    isValid,
  } = formState;

  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  useEffect(() => {
    scrollToTop();
    setTitle(`${t('questionary:respiration.title')}`);
    setType('primary');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, metadata, t]);

  // Handlers
  const onSubmit = async (values: Step5Type) => {
    if (values) {
      if (((metadata?.current ?? 5) === (metadata?.total ?? 6) || (country === 'Japan' && !patientId))) {
        await doSubmit({
          setSubmitError: s => setSubmitError(!s ? null : t(s)),
          state,
          captchaValue,
          action,
          nextStep,
          setActiveStep,
          history,
          userCookie,
        });
      } else {
        action(values);
        if (nextStep) {
          setActiveStep(false);
          history.push(nextStep);
        }
      }
    }
  };

  const getLeftLabel = React.useCallback(() => {
    if (country === 'Japan' && !patientId) {
      if (isSubmitting) {
        return t('questionary:submitting');
      }
      return t('beforeSubmit:submitButton');
    }

    return t('questionary:nextButton');
  }, [country, isSubmitting, patientId, t]);

  // Memos
  const medicalOptions = React.useMemo(() => {
    if (country === 'Japan') {
      return [
        {
          value: 'none',
          label: t('questionary:respiration.options.none'),
        },
        {
          value: 'asthma',
          label: t('questionary:respiration.options.asthma'),
        },
        {
          value: 'pneumonia',
          label: t('questionary:respiration.options.pneumonia'),
        },
        {
          value: 'tuberculosis',
          label: t('questionary:respiration.options.tuberculosis'),
        },
        {
          value: 'copdEmphysema',
          label: t('questionary:respiration.options.emphysema'),
        },
        {
          value: 'pulmonaryFibrosis',
          label: t('questionary:respiration.options.pulmonaryFibrosis'),
        },
        {
          value: 'cysticFibrosis',
          label: t('questionary:respiration.options.cysticFibrosis'),
        },
        {
          value: 'chronicRespiratoryDisease',
          label: t('questionary:respiration.options.chronicRespiratoryDisease'),
        },
        {
          value: 'chronicLungDiseases',
          label: t('questionary:respiration.options.chronicLungDiseases'),
        },
        {
          value: 'coughOtherConditions',
          label: t('questionary:respiration.options.coughOtherConditions'),
        },
        {
          value: 'other',
          label: t('questionary:medical.options.other'),
        },
      ];
    }
    return [
      {
        value: 'none',
        label: t('questionary:respiration.options.none'),
      },
      {
        value: 'asthma',
        label: t('questionary:respiration.options.asthma'),
      },
      {
        value: 'bronchitis',
        label: t('questionary:respiration.options.bronchitis'),
      },
      {
        value: 'copdEmphysema',
        label: t('questionary:respiration.options.emphysema'),
      },
      {
        value: 'pneumonia',
        label: t('questionary:respiration.options.pneumonia'),
      },
      {
        value: 'tuberculosis',
        label: t('questionary:respiration.options.tuberculosis'),
      },
      {
        value: 'other',
        label: t('questionary:medical.options.other'),
      },
    ];
  }, [country, t]);

  return (
    <MainContainer>
      <ProgressIndicator
        currentStep={customSteps.current}
        totalSteps={customSteps.total}
        progressBar
      />
      <QuestionText bold={false}>
        <Trans i18nKey="questionary:respiration.question">
          <strong>Which of the below respiratory conditions do you currently have?</strong>
        </Trans>
        <QuestionAllApply>{t('questionary:allThatApply')}</QuestionAllApply>
      </QuestionText>
      <Controller
        control={control}
        name="currentRespiratoryCondition"
        defaultValue={{ selected: [], other: '' }}
        render={({ onChange, value }) => (
          <OptionList
            isCheckbox
            value={value}
            onChange={v => onChange(v)}
            items={medicalOptions}
            excludableValues={['none']}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="currentRespiratoryCondition"
        render={({ message }) => (
          <p>{message}</p>
        )}
      />

      {/* Bottom Buttons */}
      {activeStep && (
        <Portal>
          {((metadata?.current ?? 5) === (metadata?.total ?? 6) || (country === 'Japan' && !patientId)) && (
            <Recaptcha onChange={setCaptchaValue} setRecaptchaAvailable={setRecaptchaAvailable} />
          )}
          {submitError && (
            <TempBeforeSubmitError>
              {submitError}
            </TempBeforeSubmitError>
          )}
          <WizardButtons
            invert
            leftLabel={getLeftLabel()}
            leftHandler={handleSubmit(onSubmit)}
            leftDisabled={country === 'Japan' && !patientId ? (isSubmitting || (recaptchaAvailable && !captchaValue)) || !isValid : !isValid || !recaptchaAvailable}
          />
        </Portal>
      )}
    </MainContainer>
  );
};

export default React.memo(Step5);
