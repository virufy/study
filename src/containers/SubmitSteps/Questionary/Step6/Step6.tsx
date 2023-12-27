import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { Trans, useTranslation } from 'react-i18next';
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

// Hooks
import useHeaderContext from 'hooks/useHeaderContext';
import { getPatientId, getCountry } from 'helper/stepsDefinitions';
import useCustomProgressBarSteps from 'hooks/useCustomProgressBarSteps';

// Utils
import { scrollToTop } from 'helper/scrollHelper';
import { doSubmit } from 'helper/submitHelper';

// Styles
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';
import {
  QuestionText, TempBeforeSubmitError, MainContainer,
  QuestionAllApply,
} from '../style';

const schema = Yup.object({
  currentMedicalCondition: Yup.object({
    selected: Yup.array().required(),
  }),
}).defined();

type Step6Type = Yup.InferType<typeof schema>;

const Step6 = ({
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
  const patientId = getPatientId();
  const country = getCountry();
  const [cookies] = useCookies(['virufy-study-user']);
  const { customSteps } = useCustomProgressBarSteps(storeKey, metadata);

  const userCookie = cookies['virufy-study-user'];

  // States
  const [activeStep, setActiveStep] = React.useState(true);

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    resolver: yupResolver(schema),
  });
  const { errors, isValid } = formState;

  /* Delete after Contact info step is re-integrated */
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
  const [recaptchaAvailable, setRecaptchaAvailable] = React.useState(true);
  const { isSubmitting } = formState;

  useEffect(() => {
    if (!captchaValue) {
      setSubmitError(null);
    }
  }, [captchaValue]);

  const onSubmit = async (values: Step6Type) => {
    if (values && country !== 'Japan') {
      await doSubmit({
        setSubmitError: s => setSubmitError(!s ? null : t(s)),
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

    if (values) {
      action(values);
      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  const onSubmitPatientQuestionnaire = () => {
    if (nextStep) {
      setActiveStep(false);
      history.push(nextStep);
    }
  };

  /*  */

  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  const getLeftLabel = React.useCallback(() => {
    if (country === 'Japan' && !patientId) return t('questionary:nextButton');

    if (isSubmitting) {
      return t('questionary:submitting');
    }
    return t('beforeSubmit:submitButton');
  }, [country, isSubmitting, patientId, t]);

  const leftDisabled = React.useMemo(() => {
    if (country === 'Japan' && !patientId) return !isValid;

    if (country !== 'Colombia') {
      return isSubmitting || (recaptchaAvailable && !captchaValue);
    }
    return isSubmitting;
  }, [captchaValue, country, isSubmitting, patientId, recaptchaAvailable, isValid]);

  useEffect(() => {
    scrollToTop();
    setTitle(country === 'Japan' ? t('questionary:medical.title') : t('questionary:respiration.title'));
    setType('primary');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, metadata, t, country]);

  // Handlers
  // const onSubmit = async (values: Step6Type) => {
  //   if (values) {
  //     action(values);
  //     if (nextStep) {
  //       setActiveStep(false);
  //       history.push(nextStep);
  //     }
  //   }
  // };

  // Memos
  const medicalOptions = React.useMemo(() => {
    if (country === 'Japan') {
      return [
        {
          value: 'none',
          label: t('questionary:medical.options.none'),
        },
        {
          value: 'respiratorySystem',
          label: t('questionary:medical.options.respiratorySystem'),
        },
        {
          value: 'chronicKidney',
          label: t('questionary:medical.options.chronicKidney'),
        },
        {
          value: 'diabetes',
          label: t('questionary:medical.options.diabetes'),
        },
        {
          value: 'highBloodPressure',
          label: t('questionary:medical.options.highBloodPressure'),
        },
        {
          value: 'dislipidemia',
          label: t('questionary:medical.options.dislipidemia'),
        },
        {
          value: 'extremeObesity',
          label: t('questionary:medical.options.obesity'),
        },
        {
          value: 'pregnancy',
          label: t('questionary:medical.options.pregnancy'),
        },
        {
          value: 'hivAidsOrImpairedImmuneSystem',
          label: t('questionary:medical.options.hiv'),
        },
        {
          value: 'cancer',
          label: t('questionary:medical.options.cancer'),
        },
        {
          value: 'congestiveHeartDisease',
          label: t('questionary:medical.options.congestiveHeartDisease'),
        },
        {
          value: 'cerebrovascular',
          label: t('questionary:medical.options.cerebrovascular'),
        },
        {
          value: 'valvularHeart',
          label: t('questionary:medical.options.valvularHeart'),
        },
        {
          value: 'congestiveHeart',
          label: t('questionary:medical.options.congestiveHeart'),
        },
        {
          value: 'sinusitis',
          label: t('questionary:medical.options.sinusitis'),
        },
        {
          value: 'immunosuppressiveTherapy',
          label: t('questionary:medical.options.immunosuppressiveTherapy'),
        },
        {
          value: 'immunodeficiency',
          label: t('questionary:medical.options.immunodeficiency'),
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
        label: t('questionary:medical.options.none'),
      },
      {
        value: 'allergies',
        label: t('questionary:medical.options.allergies'),
      },
      {
        value: 'asthma',
        label: t('questionary:medical.options.asthma'),
      },
      {
        value: 'bronchitis',
        label: t('questionary:medical.options.bronchitis'),
      },
      {
        value: 'congestiveHeartFailure',
        label: t('questionary:medical.options.congestiveHeart'),
      },
      {
        value: 'copdEmphysema',
        label: t('questionary:medical.options.emphysema'),
      },
      {
        value: 'extremeObesity',
        label: t('questionary:medical.options.obesity'),
      },
      {
        value: 'heartDisease',
        label: t('questionary:medical.options.heartDisease'),
      },
      {
        value: 'hivAidsOrImpairedImmuneSystem',
        label: t('questionary:medical.options.hiv'),
      },
      {
        value: 'lungCancer',
        label: t('questionary:medical.options.lungCancer'),
      },
      {
        value: 'otherChronic',
        label: t('questionary:medical.options.otherChronic'),
      },
      {
        value: 'pneumonia',
        label: t('questionary:medical.options.pneumonia'),
      },
      {
        value: 'pulmonaryFibrosis',
        label: t('questionary:medical.options.pulmonary'),
      },
      {
        value: 'reflux',
        label: t('questionary:medical.options.reflux'),
      },
      {
        value: 'sinusitis',
        label: t('questionary:medical.options.sinusitis'),
      },
      {
        value: 'tuberculosis',
        label: t('questionary:medical.options.tuberculosis'),
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
      <QuestionText extraSpace first>
        <Trans i18nKey="questionary:medical.question">
          <strong>Which of the below medical conditions do you currently have?</strong>
        </Trans>
        <QuestionAllApply>{t('questionary:allThatApply')}</QuestionAllApply>
      </QuestionText>
      <Controller
        control={control}
        name="currentMedicalCondition"
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
        name="currentMedicalCondition"
        render={({ message }) => (
          <p>{message}</p>
        )}
      />

      {/* Bottom Buttons */}
      {activeStep && (
        <Portal>
          { /* ReCaptcha  */}
          {((!patientId || (patientId && (country !== 'Colombia'))) && (!patientId && country !== 'Japan')) && (
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
            leftDisabled={leftDisabled}
            leftHandler={patientId ? handleSubmit(onSubmitPatientQuestionnaire) : handleSubmit(onSubmit)}
          />
        </Portal>
      )}
    </MainContainer>
  );
};

export default React.memo(Step6);
