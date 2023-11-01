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
  antigenTestDate: Yup.date().required(),
  antigenTestResult: Yup.string().required(),
}).defined();

type Step1cType = Yup.InferType<typeof schemaWithoutPatient>;

const Step1c = ({
  previousStep,
  nextStep,
  storeKey,
  metadata,
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
      setTitle(t('questionary:testTaken.title'));
      setType('primary');
    }
    setSubtitle('');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, setSubtitle, patientId, t]);

  // Handlers
  const onSubmit = async (values: Step1cType) => {
    if (values) {
      const {
        antigenTestDate,
        antigenTestResult,
      } = (values as any);
      // if patient
      if (!antigenTestDate || !antigenTestResult) {
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
  const antigenOptions = React.useMemo(() => [
    {
      value: 'positive',
      label: t('questionary:resultAntigenTest.options.positive'),
    },
    {
      value: 'negative',
      label: t('questionary:resultAntigenTest.options.negative'),
    },
  ], [t]);

  return (
    <MainContainer>
      <ProgressIndicator
        currentStep={metadata?.current}
        totalSteps={metadata?.total}
        progressBar
      />
      <QuestionText extraSpace first>
        {t('questionary:whenAntigenTest')}
        <QuestionAllApply>{t('questionary:whenAntigenTestNote')}</QuestionAllApply>
      </QuestionText>

      <Controller
        control={control}
        name="antigenTestDate"
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
      {errors && <p><ErrorMessage errors={errors} name="antigenTestDate" /></p>}

      <QuestionText extraSpace>
        {t('questionary:resultAntigenTest.question')}
      </QuestionText>
      <Controller
        control={control}
        name="antigenTestResult"
        defaultValue={undefined}
        render={({ onChange, value }) => (
          <OptionList
            singleSelection
            value={{ selected: value ? [value] : [] }}
            onChange={v => onChange(v.selected[0])}
            items={antigenOptions}
          />
        )}
      />
      {errors && <p><ErrorMessage errors={errors} name="antigenTestResult" /></p>}

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

export default React.memo(Step1c);
