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
  currentMedicalCondition: Yup.object(),
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

  const userCookie = cookies['virufy-study-user'];

  // States
  const [activeStep, setActiveStep] = React.useState(true);

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    defaultValues: state?.[storeKey],
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

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
    if (values) {
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

  useEffect(() => {
    scrollToTop();
    setTitle(`${t('questionary:respiration.title')}`);
    setType('primary');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, metadata, t]);

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
        currentStep={metadata?.current}
        totalSteps={metadata?.total}
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
          {(!patientId || (patientId && (country !== 'Colombia'))) && (
            <Recaptcha onChange={setCaptchaValue} setRecaptchaAvailable={setRecaptchaAvailable} />
          )}
          {submitError && (
            <TempBeforeSubmitError>
              {submitError}
            </TempBeforeSubmitError>
          )}
          <WizardButtons
            invert
            // leftLabel={t('questionary:proceedButton')}
            leftLabel={isSubmitting ? t('questionary:submitting') : t('beforeSubmit:submitButton')}
            leftDisabled={(country !== 'Colombia') ? (isSubmitting || (recaptchaAvailable && !captchaValue)) : isSubmitting}
            leftHandler={patientId ? handleSubmit(onSubmitPatientQuestionnaire) : handleSubmit(onSubmit)}
          />
        </Portal>
      )}
    </MainContainer>
  );
};

export default React.memo(Step6);
