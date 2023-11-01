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

// Helpers
import { getCountry } from 'helper/stepsDefinitions';

// Update Action
import { updateAction } from 'utils/wizard';

// Components
import { TitleBlack } from 'components/Texts';
import ProgressIndicator from 'components/ProgressIndicator';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';
import {
  MainContainer, QuestionText, QuestionAllApply,
  WomanWithPhone,
} from '../style';

const schema = Yup.object({
  testTaken: Yup.array().of(Yup.string().required()).required().default([])
    .test('SelecteOne', 'Select one', v => !(!!v && v.length > 1 && (v.includes('unsure') || v.includes('neither')))),
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
  const {
    setDoGoBack, setTitle, setSubtitle, setType,
  } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
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
    setTitle(`${t('questionary:testTaken.title')}`);
    setSubtitle('');
    setType('primary');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, setSubtitle, t, metadata]);

  // Handlers
  const onSubmit = async (values: Step1aType) => {
    if (values) {
      const { testTaken } = values;
      if (testTaken) {
        const includesNeither = ((testTaken as unknown) as string[]).includes('neither');
        const includesUnsure = ((testTaken as unknown) as string[]).includes('unsure');
        action(values);
        if ((includesNeither || includesUnsure) && otherSteps && otherSteps.noTestStep) {
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
    <MainContainer>
      <TitleBlack>{t('questionary:title')}</TitleBlack>
      {
        country === 'Japan' && (
          <QuestionText bold={false}>{t('questionary:caption')}</QuestionText>
        )
      }
      <WomanWithPhone />
      <ProgressIndicator
        currentStep={metadata?.current}
        totalSteps={metadata?.total}
        progressBar
      />
      <QuestionText>{t('questionary:testTaken.question')}
        <QuestionAllApply>{t('questionary:allThatApply')}</QuestionAllApply>
      </QuestionText>

      <Controller
        control={control}
        name="testTaken"
        defaultValue={[]}
        render={({ onChange, value }) => (
          <OptionList
            isCheckbox
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
              /* {
                value: 'antibody',
                label: t('questionary:testTaken.options.antibody'),
              }, */
              {
                value: 'unsure',
                label: t('questionary:testTaken.options.unsure'),
              },
              {
                value: 'neither',
                label: t('questionary:testTaken.options.neither'),
              },
            ]}
            excludableValues={['unsure', 'neither']}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="testTaken"
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

export default React.memo(Step1a);
