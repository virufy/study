import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { Trans, useTranslation } from 'react-i18next';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers';
import { ErrorMessage } from '@hookform/error-message';
import * as Yup from 'yup';

// Update Action
import { updateAction } from 'utils/wizard';

// Components
import ProgressIndicator from 'components/ProgressIndicator';
import Recaptcha from 'components/Recaptcha';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';
import { doSubmit } from 'helper/submitHelper';

// Styles
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';
import {
  QuestionText, QuestionStepIndicator, GrayExtraInfo, TempBeforeSubmitError,
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
  const { setDoGoBack, setTitle } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { state, action } = useStateMachine(updateAction(storeKey));

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
        state,
        captchaValue,
        action,
        nextStep,
        setActiveStep,
        history,
      });
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
    setTitle(t('questionary:headerText'));
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, t]);

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

  return (
    <>
      <ProgressIndicator currentStep={metadata?.progressCurrent || 3} totalSteps={metadata?.progressTotal || 4} />

      <GrayExtraInfo>{t('questionary:caption')}</GrayExtraInfo>

      <QuestionText bold={false}>
        <Trans i18nKey="questionary:medical.question">
          <strong>Which of the below medical conditions do you currently have?</strong> (Select all that apply)
        </Trans>
      </QuestionText>
      <Controller
        control={control}
        name="currentMedicalCondition"
        defaultValue={{ selected: [], other: '' }}
        render={({ onChange, value }) => (
          <OptionList
            value={value}
            onChange={v => onChange(v)}
            items={[
              {
                value: 'chronicLungDisease',
                label: t('questionary:medical.options.chronicLung'),
              },
              {
                value: 'congestiveHeartFailure',
                label: t('questionary:medical.options.congestiveHeart'),
              },
              {
                value: 'coughFromOtherMedicalConditions',
                label: t('questionary:medical.options.cough'),
              },
              {
                value: 'extremeObesity',
                label: t('questionary:medical.options.obesity'),
              },
              {
                value: 'hivAidsOrImpairedImmuneSystem',
                label: t('questionary:medical.options.hiv'),
              },
              {
                value: 'pulmonaryFibrosis',
                label: t('questionary:medical.options.pulmonary'),
              },
              {
                value: 'pregnancy',
                label: t('questionary:medical.options.pregnancy'),
              },
              {
                value: 'valvularHeartDisease',
                label: t('questionary:medical.options.valvularHeart'),
              },
              {
                value: 'none',
                label: t('questionary:medical.options.none'),
              },
            ]}
            allowAddOther
            addOtherLabel={t('questionary:medical.options.addOther')}
            otherPlaceholder={t('questionary:medical.addOtherPlaceholder')}
            excludableValue="none"
          />
        )}
      />
      {/* Bottom Buttons */}
      <p><ErrorMessage errors={errors} name="name" /></p>
      {activeStep && (
        <Portal>
          {metadata && (
            <QuestionStepIndicator>
              {metadata.current} {t('questionary:stepOf')} {metadata.total}
            </QuestionStepIndicator>
          )}
          { /* ReCaptcha  */}
          <Recaptcha onChange={setCaptchaValue} />
          {submitError && (
          <TempBeforeSubmitError>
            {submitError}
          </TempBeforeSubmitError>
          )}
          <WizardButtons
            invert
            // leftLabel={t('questionary:proceedButton')}
            leftLabel={isSubmitting ? t('questionary:submitting') : t('beforeSubmit:submitButton')}
            leftDisabled={!captchaValue || isSubmitting}
            leftHandler={handleSubmit(onSubmit)}
          />
        </Portal>
      )}
    </>
  );
};

export default React.memo(Step6);
