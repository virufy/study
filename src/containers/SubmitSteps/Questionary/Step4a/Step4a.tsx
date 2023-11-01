import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation, Trans } from 'react-i18next';

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
import { getCountry } from 'helper/stepsDefinitions';

// Components
import Recaptcha from 'components/Recaptcha';
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';
import ProgressIndicator from 'components/ProgressIndicator';

// Styles
import {
  QuestionText, MainContainer, QuestionNote, TempBeforeSubmitError,
} from '../style';

const schema = Yup.object({
  currentSymptoms: Yup.object().required(),
}).defined();

type Step4aType = Yup.InferType<typeof schema>;

const Step4a = ({
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
  const country = getCountry();

  // States
  const [activeStep, setActiveStep] = React.useState(true);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
  const [recaptchaAvailable, setRecaptchaAvailable] = React.useState(true);

  // Form
  const {
    control, handleSubmit, formState, watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    resolver: yupResolver(schema),
  });
  const { errors, isSubmitting, isValid } = formState;

  useEffect(() => {
    if (!captchaValue) {
      setSubmitError(null);
    }
  }, [captchaValue]);

  const watchSymptoms = watch('currentSymptoms');
  const isShortQuestionary = metadata?.isShortQuestionary;

  const isFinalStep = React.useMemo(() => {
    if (isShortQuestionary && ((watchSymptoms?.selected.length === 0) || watchSymptoms?.selected?.some((item: string) => item === 'none'))) {
      return true;
    }
    return false;
  }, [isShortQuestionary, watchSymptoms?.selected]);

  const renderCaptcha = React.useMemo(() => {
    if (isFinalStep && (country !== 'Colombia')) {
      if (submitError) {
        return (
          <>
            <Recaptcha onChange={setCaptchaValue} setRecaptchaAvailable={setRecaptchaAvailable} />
            <TempBeforeSubmitError>
              {submitError}
            </TempBeforeSubmitError>
          </>
        );
      }
      return <Recaptcha onChange={setCaptchaValue} setRecaptchaAvailable={setRecaptchaAvailable} />;
    }
    return null;
  }, [isFinalStep, submitError]);

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
    setTitle(`${t('questionary:symptoms.title')}`);
    setType('primary');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, metadata, t]);

  // Handlers
  const onSubmit = async (values: Step4aType) => {
    if (values) {
      const {
        currentSymptoms,
      } = (values as any);

      action(values);

      let hasSymptom = false;

      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < currentSymptoms.selected?.length; index++) {
        if (currentSymptoms.selected[index] !== 'none') {
          hasSymptom = true;
          break;
        }
      }

      if (hasSymptom && otherSteps) {
        setActiveStep(false);
        history.push(otherSteps.covidSymptomsStep);
        return;
      }

      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  const onSubmitPatientShortQuestionnaire = () => {
    if (nextStep) {
      setActiveStep(false);
      history.push(nextStep);
    }
  };

  const getLeftLabel = () => {
    if (isFinalStep) {
      if (isSubmitting) {
        return t('questionary:submitting');
      }
      return t('beforeSubmit:submitButton');
    }
    return t('questionary:nextButton');
  };

  return (
    <MainContainer>
      <ProgressIndicator
        currentStep={metadata?.current}
        totalSteps={metadata?.total}
        progressBar
      />
      <QuestionText extraSpace first>
        <Trans i18nKey="questionary:symptoms.question">
          <strong>Which of the below symptoms do you currently have?</strong>
        </Trans>
        <QuestionNote>{t('questionary:allThatApply')}</QuestionNote>
      </QuestionText>
      <Controller
        control={control}
        name="currentSymptoms"
        defaultValue={{ selected: [], other: '' }}
        render={({ onChange, value }) => (
          <OptionList
            isCheckbox
            value={value}
            onChange={v => onChange(v)}
            items={[
              {
                value: 'none',
                label: t('questionary:symptoms.options.none'),
              },
              {
                value: 'bodyAches',
                label: t('questionary:symptoms.options.bodyAches'),
              },
              {
                value: 'dryCough',
                label: t('questionary:symptoms.options.dryCough'),
              },
              {
                value: 'wetCough',
                label: t('questionary:symptoms.options.wetCough'),
              },
              {
                value: 'feverChillsSweating',
                label: t('questionary:symptoms.options.feverChillsSweating'),
              },
              {
                value: 'headaches',
                label: t('questionary:symptoms.options.headaches'),
              },
              {
                value: 'lossTasteAndOrSmell',
                label: t('questionary:symptoms.options.lossTasteOrSmell'),
              },
              {
                value: 'newOrWorseCough',
                label: t('questionary:symptoms.options.worseCough'),
              },
              {
                value: 'runnyNose',
                label: t('questionary:symptoms.options.runnyNose'),
              },
              {
                value: 'breathShortness',
                label: t('questionary:symptoms.options.breathShortness'),
              },
              {
                value: 'soreThroat',
                label: t('questionary:symptoms.options.soreThroat'),
              },
              {
                value: 'chestTightness',
                label: t('questionary:symptoms.options.chestTightness'),
              },
              {
                value: 'vomitingAndDiarrhea',
                label: t('questionary:symptoms.options.vomitingAndDiarrhea'),
              },
              {
                value: 'weakness',
                label: t('questionary:symptoms.options.weakness'),
              },
              {
                value: 'other',
                label: t('questionary:symptoms.options.other'),
              },
            ]}
            excludableValues={['none']}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="currentSymptoms"
        render={({ message }) => (
          <p>{message}</p>
        )}
      />

      {/* Bottom Buttons */}
      {activeStep && (
        <Portal>
          {renderCaptcha}
          <WizardButtons
            leftLabel={getLeftLabel()}
            leftDisabled={(isFinalStep && (country !== 'Colombia')) ? (isSubmitting || (recaptchaAvailable && !captchaValue)) : !isValid}
            leftHandler={isFinalStep ? handleSubmit(onSubmitPatientShortQuestionnaire) : handleSubmit(onSubmit)}
            invert
          />
        </Portal>
      )}
    </MainContainer>
  );
};

export default React.memo(Step4a);
