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
import WizardButtons from 'components/WizardButtons';
import ProgressIndicator from 'components/ProgressIndicator';
import OptionList from 'components/OptionList';

// Styles
import {
  QuestionText, MainContainer, QuestionAllApply, WomanWithPhone,
} from '../style';

const schemaWithoutPatient = Yup.object({
  typeCovidFlu: Yup.object({
    selected: Yup.array().required(),
  }),
}).defined();

type Step1fType = Yup.InferType<typeof schemaWithoutPatient>;

const Step1f = ({
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

  // States
  const [activeStep, setActiveStep] = React.useState(true);

  // Form
  const {
    control, handleSubmit, formState, watch,
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

  // Memos
  const watchedtypeCovidFlu = watch('typeCovidFlu');

  const customTotalSteps = React.useMemo(() => {
    if (!watchedtypeCovidFlu) return 9;

    const { selected } = watchedtypeCovidFlu;

    switch (true) {
      case ['antigenTaken', 'PCRTaken', 'fluTaken'].every((i: string) => selected.includes(i)):
        return 14;

      case ['PCRTaken', 'fluTaken'].every((i: string) => selected.includes(i)):
        return 13;

      case ['antigenTaken', 'PCRTaken'].every((i: string) => selected.includes(i))
      || ['antigenTaken', 'fluTaken'].every((i: string) => selected.includes(i)):
        return 12;

      case ['fluTaken', 'PCRTaken'].some((i: string) => selected.includes(i)):
        return 11;

      case ['antigenTaken'].every((i: string) => selected.includes(i)):
        return 10;

      case ['none'].every((i: string) => selected.includes(i)):
        return 9;

      default:
        return 9;
    }
  }, [watchedtypeCovidFlu]);

  // Effects
  useEffect(() => {
    scrollToTop();
    if (patientId) {
      setTitle('');
      setType('tertiary');
    } else {
      setTitle(t('typeCovidFlu:title'));
      setType('primary');
    }
    setSubtitle('');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, setSubtitle, patientId, t]);

  // Handlers
  const onSubmit = async (values: Step1fType) => {
    if (values) {
      const { typeCovidFlu }: CommonJSON = values;
      const antigenTaken = typeCovidFlu?.selected.includes('antigenTaken');
      const PCRTaken = typeCovidFlu?.selected.includes('PCRTaken');
      const fluTaken = typeCovidFlu?.selected.includes('fluTaken');
      action(values);
      if (antigenTaken && otherSteps) {
        setActiveStep(false);
        history.push(otherSteps.antigenTakenStep);
      } else if (PCRTaken && otherSteps) {
        setActiveStep(false);
        history.push(otherSteps.PCRTakenStep);
      } else if (fluTaken && otherSteps) {
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
      <QuestionText extraSpace first>
        {t('questionary:typeCovidFlu.title')}
      </QuestionText>
      <WomanWithPhone />
      <ProgressIndicator
        currentStep={metadata?.current}
        totalSteps={customTotalSteps}
        progressBar
      />

      <QuestionText extraSpace>
        {t('questionary:typeCovidFlu.question')}
        <QuestionAllApply>{t('questionary:allThatApply')}</QuestionAllApply>
      </QuestionText>
      <Controller
        control={control}
        name="typeCovidFlu"
        defaultValue={{ selected: [], other: '' }}
        render={({ onChange, value }) => (
          <OptionList
            isCheckbox
            value={value}
            onChange={v => onChange(v)}
            items={[
              {
                value: 'antigenTaken',
                label: t('questionary:typeCovidFlu.options.antigenTaken'),
              },
              {
                value: 'PCRTaken',
                label: t('questionary:typeCovidFlu.options.PCRTaken'),
              },
              {
                value: 'fluTaken',
                label: t('questionary:typeCovidFlu.options.fluTaken'),
              },
              {
                value: 'none',
                label: t('questionary:typeCovidFlu.options.none'),
              },
            ]}
            excludableValues={['none']}
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

export default React.memo(Step1f);
