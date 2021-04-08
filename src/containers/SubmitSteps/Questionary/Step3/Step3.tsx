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

// Update Action
import { updateAction } from 'utils/wizard';

// Components
import ProgressIndicator from 'components/ProgressIndicator';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';
import {
  QuestionText, QuestionStepIndicator, GrayExtraInfo, QuestionNote,
} from '../style';

const schema = Yup.object({
  smokeLastSixMonths: Yup.string(),
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
    <>
      <ProgressIndicator currentStep={metadata?.progressCurrent || 3} totalSteps={metadata?.progressTotal || 4} />

      <GrayExtraInfo>{t('questionary:caption')}</GrayExtraInfo>

      <QuestionText extraSpace first>
        {t('questionary:smokeLastSixMonths.question')}
        <QuestionNote>{t('questionary:smokeLastSixMonths.note')}</QuestionNote>
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
      {/* Bottom Buttons */}
      <p><ErrorMessage errors={errors} name="name" /></p>
      {activeStep && (
        <Portal>
          {metadata && (
            <QuestionStepIndicator>
              {metadata.current} {t('questionary:stepOf')} {metadata.total}
            </QuestionStepIndicator>
          )}
          <WizardButtons
            leftLabel={t('questionary:nextButton')}
            leftHandler={handleSubmit(onSubmit)}
            invert
          />
        </Portal>
      )}
    </>
  );
};

export default React.memo(Step3);
