import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation, Trans } from 'react-i18next';

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
  currentRespiratoryCondition: Yup.object().required(),
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
  const { setDoGoBack, setTitle } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { state, action } = useStateMachine(updateAction(storeKey));

  // States
  const [activeStep, setActiveStep] = React.useState(true);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    defaultValues: state?.[storeKey],
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

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
  const onSubmit = async (values: Step5Type) => {
    if (values) {
      if ((metadata?.current ?? 5) === (metadata?.total ?? 6)) {
        await doSubmit({
          setSubmitError: s => setSubmitError(!s ? null : t(s)),
          state,
          captchaValue,
          action,
          nextStep,
          setActiveStep,
          history,
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

  return (
    <>
      <ProgressIndicator currentStep={metadata?.progressCurrent || 3} totalSteps={metadata?.progressTotal || 4} />

      <GrayExtraInfo>{t('questionary:caption')}</GrayExtraInfo>

      <QuestionText bold={false}>
        <Trans i18nKey="questionary:respiration.question">
          <strong>Which of the below respiratory conditions do you currently have?</strong> (Select all that apply)
        </Trans>
      </QuestionText>
      <Controller
        control={control}
        name="currentRespiratoryCondition"
        defaultValue={{ selected: [], other: '' }}
        render={({ onChange, value }) => (
          <OptionList
            value={value}
            onChange={v => onChange(v)}
            items={[
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
                value: 'none',
                label: t('questionary:respiration.options.none'),
              },
            ]}
            allowAddOther
            addOtherLabel={t('questionary:respiration.options.addOther')}
            otherPlaceholder={t('questionary:respiration.addOtherPlaceholder')}
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
          {(metadata?.current ?? 5) === (metadata?.total ?? 6) && (
            <Recaptcha onChange={setCaptchaValue} />
          )}
          {submitError && (
            <TempBeforeSubmitError>
              {submitError}
            </TempBeforeSubmitError>
          )}
          <WizardButtons
            invert
            leftLabel={t('questionary:nextButton')}
            leftHandler={handleSubmit(onSubmit)}
          />
        </Portal>
      )}
    </>
  );
};

export default React.memo(Step5);
