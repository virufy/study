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

// Helper
import { getPatientId, getCountry } from 'helper/stepsDefinitions';
import { scrollToTop } from 'helper/scrollHelper';

// Utils
import { updateAction } from 'utils/wizard';

// Hooks
import useHeaderContext from 'hooks/useHeaderContext';
import useCustomProgressBarSteps from 'hooks/useCustomProgressBarSteps';

// Components
import OptionList from 'components/OptionList';
import DatePicker from 'components/DatePicker';
import WizardButtons from 'components/WizardButtons';
import ProgressIndicator from 'components/ProgressIndicator';

// Styles
import {
  QuestionText, MainContainer, QuestionAllApply,
} from '../style';

const schemaWithoutPatient = Yup.object({
  fluTestDate: Yup.date().required(),
  fluTestResult: Yup.string().required(),
}).defined();

type Step7aType = Yup.InferType<typeof schemaWithoutPatient>;

const Step7a = ({
  previousStep,
  nextStep,
  storeKey,
  metadata,
  otherBackSteps,
}: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const {
    setDoGoBack, setTitle, setSubtitle, setType,
  } = useHeaderContext();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const { state, action } = useStateMachine(updateAction(storeKey));
  const patientId = getPatientId();
  const country = getCountry();
  const { customSteps } = useCustomProgressBarSteps(storeKey, metadata);

  // States
  const [activeStep, setActiveStep] = React.useState(true);

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    context: {
      country,
    },
    resolver: yupResolver(schemaWithoutPatient),
  });
  const { errors, isValid } = formState;

  // Callbacks
  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
    const PCRTaken = state['submit-steps'].typeCovidFlu?.selected.includes('PCRTaken');
    const antigenTaken = state['submit-steps'].typeCovidFlu?.selected.includes('antigenTaken');
    if (PCRTaken && otherBackSteps) {
      history.push(otherBackSteps.PCRTakenStep);
    } else if (antigenTaken && otherBackSteps) {
      history.push(otherBackSteps.antigenTakenStep);
    } else if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [state, otherBackSteps, previousStep, history]);

  // Effects
  useEffect(() => {
    scrollToTop();
    if (patientId) {
      setTitle('');
      setType('tertiary');
    } else {
      setTitle(t('questionary:fluTest.title'));
      setType('primary');
    }
    setSubtitle('');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, setSubtitle, patientId, t]);

  // Handlers
  const onSubmit = async (values: Step7aType) => {
    if (values) {
      action(values);
      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  // Memos
  const fluOptions = React.useMemo(() => [
    {
      value: 'negative',
      label: t('questionary:fluTestResult.options.negative'),
    },
    {
      value: 'positiveA',
      label: t('questionary:fluTestResult.options.positiveA'),
    },
    {
      value: 'positiveB',
      label: t('questionary:fluTestResult.options.positiveB'),
    },
  ], [t]);

  return (
    <MainContainer>
      <ProgressIndicator
        currentStep={customSteps.current}
        totalSteps={customSteps.total}
        progressBar
      />
      <QuestionText extraSpace first>
        {t('questionary:whenFluTest')}
        <QuestionAllApply>{t('questionary:whenFluTestCaption')}</QuestionAllApply>
      </QuestionText>

      <Controller
        control={control}
        name="fluTestDate"
        defaultValue={undefined}
        render={({ onChange, value }) => (
          <DatePicker
            label={value ? '' : 'Date'}
            value={value ? new Date(value) : null}
            locale={i18n.language}
            onChange={onChange}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="fluTestDate"
        render={({ message }) => (
          <p>{message}</p>
        )}
      />

      <QuestionText extraSpace>
        {t('questionary:fluTestResult.question')}
      </QuestionText>
      <Controller
        control={control}
        name="fluTestResult"
        defaultValue={undefined}
        render={({ onChange, value }) => (
          <OptionList
            singleSelection
            value={{ selected: value ? [value] : [] }}
            onChange={v => onChange(v.selected[0])}
            items={fluOptions}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="fluTestResult"
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

export default React.memo(Step7a);
