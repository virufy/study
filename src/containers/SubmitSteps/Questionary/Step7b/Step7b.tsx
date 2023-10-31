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

// Update Action
import { updateAction } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Components
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';
import ProgressIndicator from 'components/ProgressIndicator';

// Styles
import {
  QuestionText, MainContainer,
} from '../style';

const schemaWithoutPatient = Yup.object({
  whenFluShot: Yup.string().required(),
}).defined();

type Step7bType = Yup.InferType<typeof schemaWithoutPatient>;

const Step7b = ({
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
  const { t } = useTranslation();
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
    } else {
      setTitle(t('questionary:fluShot.title'));
    }
    if (patientId) {
      setType('tertiary');
    } else {
      setType('primary');
    }
    setSubtitle('');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, setSubtitle, patientId, t]);

  // Handlers
  const onSubmit = async (values: Step7bType) => {
    if (values) {
      action(values);
      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  // Memos
  const fluShotOptions = React.useMemo(() => [
    {
      value: 'yes',
      label: t('questionary:whenFluShot.options.yes'),
    },
    {
      value: 'no',
      label: t('questionary:whenFluShot.options.no'),
    },
    {
      value: 'noResponse',
      label: t('questionary:whenFluShot.options.noResponse'),
    },
  ], [t]);

  return (
    <MainContainer>
      <ProgressIndicator
        currentStep={metadata?.current}
        totalSteps={metadata?.total}
        progressBar
      />
      <QuestionText first>
        {t('questionary:whenFluShot.question')}
      </QuestionText>
      <Controller
        control={control}
        name="whenFluShot"
        defaultValue={undefined}
        render={({ onChange, value }) => (
          <OptionList
            singleSelection
            value={{ selected: value ? [value] : [] }}
            onChange={v => onChange(v.selected[0])}
            items={fluShotOptions}
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
            leftDisabled={!isValid}
            invert
          />
        </Portal>
      )}
    </MainContainer>
  );
};

export default React.memo(Step7b);
