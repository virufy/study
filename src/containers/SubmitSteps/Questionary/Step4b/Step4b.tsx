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

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import DatePicker from 'components/DatePicker';
import WizardButtons from 'components/WizardButtons';
import {
  QuestionText, QuestionRequiredIndicatorText, GrayExtraInfo,
} from '../style';

const schema = Yup.object({
  symptomsStartedDate: Yup.date().required(),
}).defined();

type Step4bType = Yup.InferType<typeof schema>;

const Step4b = ({
  previousStep,
  nextStep,
  storeKey,
}: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const { setDoGoBack, setTitle } = useHeaderContext();
  const history = useHistory();
  const { t, i18n } = useTranslation();
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
    setTitle(t('questionary:headerText2'));
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, t]);

  // Handlers
  const onSubmit = async (values: Step4bType) => {
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
      <GrayExtraInfo>{t('questionary:caption')}</GrayExtraInfo>

      <QuestionText>
        {t('questionary:symptomsDate')}
        <QuestionRequiredIndicatorText> *</QuestionRequiredIndicatorText>
      </QuestionText>
      <Controller
        control={control}
        name="symptomsStartedDate"
        defaultValue={null}
        render={({ onChange, value }) => (
          <DatePicker
            label="Date"
            value={value ? new Date(value) : null}
            locale={i18n.language}
            onChange={onChange}
          />
        )}
      />
      {/* Bottom Buttons */}
      <p><ErrorMessage errors={errors} name="name" /></p>
      {activeStep && (
        <Portal>
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

export default React.memo(Step4b);
