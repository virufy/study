import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation } from 'react-i18next';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers';
import { ErrorMessage } from '@hookform/error-message';
import * as Yup from 'yup';

// Hooks
import useCustomProgressBarSteps from 'hooks/useCustomProgressBarSteps';

// Update Action
import { updateAction } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Components
import ProgressIndicator from 'components/ProgressIndicator';

// Styles
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';
import {
  QuestionText, QuestionAllApply, MainContainer,
} from '../style';

const schema = Yup.object({
  smokeLastSixMonths: Yup.string().required(),
}).defined();

type Step3Type = Yup.InferType<typeof schema>;

const Step3 = ({
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
  const { customSteps } = useCustomProgressBarSteps(storeKey, metadata);

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
  const { errors } = formState;

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
    setTitle(`${t('questionary:smokeLastSixMonths.title')}`);
    setType('primary');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, metadata, t]);

  // Handlers
  const onSubmit = async (values: Step3Type) => {
    if (values) {
      action(values);
      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  return (
    <MainContainer>
      <ProgressIndicator
        currentStep={customSteps.current}
        totalSteps={customSteps.total}
        progressBar
      />
      <QuestionText extraSpace first>
        {t('questionary:smokeLastSixMonths.question')}
        <QuestionAllApply>{t('questionary:smokeLastSixMonths.note')}</QuestionAllApply>
      </QuestionText>
      <Controller
        control={control}
        name="smokeLastSixMonths"
        defaultValue=""
        render={({ onChange, value }) => (
          <OptionList
            singleSelection
            value={{ selected: value ? [value] : [] }}
            onChange={v => onChange(v.selected[0])}
            items={[
              {
                value: 'true',
                label: t('questionary:smokeLastSixMonths.options.yes'),
              },
              {
                value: 'false',
                label: t('questionary:smokeLastSixMonths.options.no'),
              },
            ]}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="smokeLastSixMonths"
        render={({ message }) => (
          <p>{message}</p>
        )}
      />

      {/* Bottom Buttons */}
      {activeStep && (
        <Portal>
          <WizardButtons
            leftLabel={t('questionary:nextButton')}
            leftHandler={handleSubmit(onSubmit)}
            leftDisabled={!isValid}
            invert
          />
        </Portal>
      )}
    </MainContainer>
  );
};

export default React.memo(Step3);
