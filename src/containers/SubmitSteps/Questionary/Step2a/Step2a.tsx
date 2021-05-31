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
import WizardButtons from 'components/WizardButtons';
import {
  QuestionText, MainContainer, AgeInput,
} from '../style';

const schema = Yup.object({
  ageGroup: Yup.string(),
}).defined();

type Step2Type = Yup.InferType<typeof schema>;

const Step2a = ({
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
  const { setDoGoBack, setTitle, setType } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { state, action } = useStateMachine(updateAction(storeKey));

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
    const { testTaken } = state['submit-steps'];
    if ((testTaken.includes('unsure') || testTaken.includes('neither')) && otherSteps) {
      history.push(otherSteps.noTestStep);
    } else if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [state, history, otherSteps, previousStep]);

  const {
    isValid,
  } = formState;

  useEffect(() => {
    scrollToTop();
    setTitle(`${t('questionary:headerText')} ${metadata?.current} ${t('questionary:stepOf')} ${metadata?.total}`);
    setType('primary');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, metadata, t]);

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

  return (
    <MainContainer>
      <QuestionText extraSpace first>{t('questionary:ageGroup')}</QuestionText>

      <Controller
        control={control}
        name="ageGroup"
        defaultValue=""
        render={({ onChange, value, name }) => (
          <AgeInput
            name={name}
            value={value}
            onChange={onChange}
            type="number"
            placeholder={t('questionary:enterAge')}
            autoComplete="Off"
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

export default React.memo(Step2a);
