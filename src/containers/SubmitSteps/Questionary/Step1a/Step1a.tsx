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
  Title, QuestionText, QuestionStepIndicator, QuestionRequiredIndicatorText,
  GrayExtraInfo, WomanWithPhone,
} from '../style';

const schema = Yup.object({
  testTaken: Yup.array().of(Yup.string().required()).required().default([])
    .test('SelecteOne', 'Select one', v => !(!!v && v.length > 1 && v.includes('neither'))),
}).defined();

type Step1aType = Yup.InferType<typeof schema>;

const Step1a = ({
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
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const {
    isValid,
  } = formState;

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
  const onSubmit = async (values: Step1aType) => {
    if (values) {
      const { testTaken } = values;
      if (testTaken) {
        const includesNeither = ((testTaken as unknown) as string[]).includes('neither');

        action(values);
        if (includesNeither && otherSteps && otherSteps.noTestStep) {
          setActiveStep(false);
          history.push(otherSteps.noTestStep);
        } else if (nextStep) {
          setActiveStep(false);
          history.push(nextStep);
        }
      }
    }
  };

  return (
    <>
      <ProgressIndicator currentStep={metadata?.progressCurrent || 3} totalSteps={metadata?.progressTotal || 4} />
      <Title>{t('questionary:title')}</Title>
      <WomanWithPhone />
      <GrayExtraInfo>{t('questionary:caption')}</GrayExtraInfo>
      <QuestionText>{t('questionary:testTaken.question')}
        <QuestionRequiredIndicatorText> *</QuestionRequiredIndicatorText>
      </QuestionText>

      <Controller
        control={control}
        name="testTaken"
        defaultValue={[]}
        render={({ onChange, value }) => (
          <OptionList
            value={{ selected: value }}
            onChange={v => onChange(v.selected)}
            items={[
              {
                value: 'pcr',
                label: t('questionary:testTaken.options.pcr'),
              },
              {
                value: 'antigen',
                label: t('questionary:testTaken.options.antigen'),
              },
              {
                value: 'neither',
                label: t('questionary:testTaken.options.neither'),
              },
            ]}
            excludableValue="neither"
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
            leftDisabled={!isValid}
            invert
          />
        </Portal>
      )}
    </>
  );
};

export default React.memo(Step1a);
