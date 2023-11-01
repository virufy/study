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
import OptionList from 'components/OptionList';
import ProgressIndicator from 'components/ProgressIndicator';

// Helper
import { getCountry, getPatientId } from 'helper/stepsDefinitions';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import WizardButtons from 'components/WizardButtons';
import {
  QuestionText, MainContainer,
} from '../style';

const schema = Yup.object({
  vaccine: Yup.string(),
}).defined();

type Step2Type = Yup.InferType<typeof schema>;

const Step2 = ({
  previousStep,
  nextStep,
  storeKey,
  otherSteps,
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
  const patientId = getPatientId();
  const { state, action } = useStateMachine(updateAction(storeKey));
  const country = getCountry();

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

  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
    if (state['submit-steps'] && !patientId) {
      const { testTaken } = state['submit-steps'];
      if ((testTaken.includes('unsure') || testTaken.includes('neither')) && otherSteps) {
        history.push(otherSteps.noTestStep);
      } else if (previousStep) {
        history.push(previousStep);
      } else {
        history.goBack();
      }
    } else if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [state, history, otherSteps, previousStep, patientId]);

  const {
    isValid,
  } = formState;

  useEffect(() => {
    scrollToTop();
    setTitle(`${t('questionary:vaccine.title')}`);
    setType('primary');
    setSubtitle('');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setSubtitle, setType, metadata, t]);

  // Handlers
  const onSubmit = async (values: Step2Type) => {
    if (values) {
      action(values);
      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  // Memos
  const vaccineOptions = React.useMemo(() => {
    if (country === 'Japan') {
      return [
        {
          value: 'one',
          label: t('questionary:vaccine.options.1'),
        },
        {
          value: 'two',
          label: t('questionary:vaccine.options.2'),
        },
        {
          value: 'three',
          label: t('questionary:vaccine.options.3'),
        },
        {
          value: 'four',
          label: t('questionary:vaccine.options.4'),
        },
        {
          value: 'false',
          label: t('questionary:vaccine.options.no'),
        },
        {
          value: 'decline',
          label: t('questionary:vaccine.options.decline'),
        },
      ];
    }
    return [
      {
        value: 'true',
        label: t('questionary:vaccine.options.yes'),
      },
      {
        value: 'false',
        label: t('questionary:vaccine.options.no'),
      },
      {
        value: 'decline',
        label: t('questionary:vaccine.options.decline'),
      },
    ];
  }, [country, t]);

  return (
    <MainContainer>
      <ProgressIndicator
        currentStep={metadata?.current}
        totalSteps={metadata?.total}
        progressBar
      />
      <QuestionText first>{t('questionary:vaccine.question')}
      </QuestionText>
      <Controller
        control={control}
        name="vaccine"
        defaultValue=""
        render={({ onChange, value }) => (
          <OptionList
            singleSelection
            value={{ selected: value ? [value] : [] }}
            onChange={v => onChange(v.selected[0])}
            items={vaccineOptions}
          />
        )}
      />
      {errors && <p><ErrorMessage errors={errors} name="vaccine" /></p>}

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

export default React.memo(Step2);
