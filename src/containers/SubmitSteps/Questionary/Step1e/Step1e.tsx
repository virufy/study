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
import WizardButtons from 'components/WizardButtons';
import ProgressIndicator from 'components/ProgressIndicator';

// Styles
import {
  QuestionText, MainContainer, QuestionAllApply, QuestionInput,
} from '../style';

const schemaWithoutPatient = Yup.object({
  covidTimes: Yup.string().test('covidTimes-invalid', '', value => {
    let result = true;
    if (value && Number(value) < 0) result = false;
    return result;
  }).required(),
  lastTimeCovidMonths: Yup.string().test('lastTimeCovidMonths-invalid', '', value => {
    let result = true;
    if (value && Number(value) < 0) result = false;
    return result;
  }).notRequired(),
}).defined();

type Step1eType = Yup.InferType<typeof schemaWithoutPatient>;

const Step1e = ({
  previousStep,
  nextStep,
  storeKey,
  metadata,
  otherSteps,
}: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const {
    setDoGoBack, setTitle, setSubtitle, setType,
  } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { state, action } = useStateMachine(updateAction(storeKey));
  const patientId = getPatientId();
  const country = getCountry();
  const { customSteps, customCurrentStepPCR } = useCustomProgressBarSteps(storeKey, metadata);

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
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  // Effects
  useEffect(() => {
    scrollToTop();
    if (patientId) {
      setTitle('');
      setType('tertiary');
    } else {
      setTitle(t('questionary:covidTimesTitle'));
      setType('primary');
    }
    setSubtitle('');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, setSubtitle, patientId, t]);

  // Handlers
  const onSubmit = async (values: Step1eType) => {
    if (values) {
      action(values);
      const fluTaken = state['submit-steps'].typeCovidFlu?.selected.includes('fluTaken');
      if (fluTaken && otherSteps) {
        setActiveStep(false);
        history.push(otherSteps.fluTakenStep);
      } else if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  return (
    <MainContainer>
      <ProgressIndicator
        currentStep={customCurrentStepPCR}
        totalSteps={customSteps.total}
        progressBar
      />
      <QuestionText extraSpace first>
        {t('questionary:covidTimes')}
      </QuestionText>
      <Controller
        control={control}
        name="covidTimes"
        defaultValue=""
        render={({ onChange, value, name }) => (
          <QuestionInput
            name={name}
            value={value}
            onChange={onChange}
            type="number"
            placeholder={t('questionary:covidTimesPlaceholder')}
            autoComplete="Off"
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="covidTimes"
        render={({ message }) => (
          <p>{message}</p>
        )}
      />

      <QuestionText extraSpace>
        {t('questionary:lastTimeCovidMonths')}
        <QuestionAllApply>{t('questionary:lastTimeCovidMonthsCaption')}</QuestionAllApply>
      </QuestionText>
      <Controller
        control={control}
        name="lastTimeCovidMonths"
        defaultValue=""
        render={({ onChange, value, name }) => (
          <QuestionInput
            name={name}
            value={value}
            onChange={onChange}
            type="number"
            placeholder={t('questionary:lastTimeCovidMonthsPlaceholder')}
            autoComplete="Off"
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="lastTimeCovidMonths"
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

export default React.memo(Step1e);
