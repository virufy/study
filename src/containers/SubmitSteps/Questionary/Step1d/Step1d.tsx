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
  pcrTestDate: Yup.date().required(),
  pcrTestResult: Yup.string().required(),
}).defined();

type Step1dType = Yup.InferType<typeof schemaWithoutPatient>;

const Step1d = ({
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
  const { customSteps, customCurrentStepPCR } = useCustomProgressBarSteps(storeKey, metadata);

  // States
  const [activeStep, setActiveStep] = React.useState(true);
  // const [hasAntibodyTest, setHasAntibodyTest] = React.useState(false);

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    context: {
      hasPcr: state['submit-steps']?.testTaken?.includes('pcr') ?? false,
      hasAntigen: state['submit-steps']?.testTaken?.includes('antigen') ?? false,
      // hasAntibody: state['submit-steps'].testTaken.includes('antibody'),
      country,
    },
    resolver: yupResolver(schemaWithoutPatient),
  });
  const { errors, isValid } = formState;

  // Callbacks
  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
    const antigenTaken = state['submit-steps'].typeCovidFlu?.selected.includes('antigenTaken');
    if (antigenTaken && otherBackSteps) {
      history.push(otherBackSteps.antigenTakenStep);
    } else if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, otherBackSteps, previousStep, state]);

  // Effects
  useEffect(() => {
    scrollToTop();
    if (patientId) {
      setTitle('');
      setType('tertiary');
    } else {
      setTitle(t('questionary:resultPcrTest.title'));
      setType('primary');
    }
    setSubtitle('');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, setSubtitle, patientId, t]);

  // Handlers
  const onSubmit = async (values: Step1dType) => {
    if (values) {
      const {
        pcrTestDate,
        pcrTestResult,
      } = (values as any);
      // if patient
      if (!pcrTestDate || !pcrTestResult) {
        return;
      }

      action(values);
      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  // Memos
  const pcrOptions = React.useMemo(() => [
    {
      value: 'positive',
      label: t('questionary:resultPcrTest.options.positive'),
    },
    {
      value: 'negative',
      label: t('questionary:resultPcrTest.options.negative'),
    },
  ], [t]);

  return (
    <MainContainer>
      <ProgressIndicator
        currentStep={customCurrentStepPCR}
        totalSteps={customSteps.total}
        progressBar
      />
      <QuestionText extraSpace first>
        {t('questionary:whenPcrTest')}
        <QuestionAllApply>{t('questionary:resultPcrTest.caption')}</QuestionAllApply>
      </QuestionText>
      <Controller
        control={control}
        name="pcrTestDate"
        defaultValue={undefined}
        render={({ onChange, value }) => (
          <DatePicker
            label="Date"
            value={value ? new Date(value) : null}
            locale={i18n.language}
            onChange={onChange}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="pcrTestDate"
        render={({ message }) => (
          <p>{message}</p>
        )}
      />

      <QuestionText extraSpace>
        {t('questionary:resultPcrTest.question')}
      </QuestionText>
      <Controller
        control={control}
        name="pcrTestResult"
        defaultValue={undefined}
        render={({ onChange, value }) => (
          <OptionList
            singleSelection
            value={{ selected: value ? [value] : [] }}
            onChange={v => onChange(v.selected[0])}
            items={pcrOptions}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="pcrTestResult"
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

export default React.memo(Step1d);
