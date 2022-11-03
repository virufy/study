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
import { doSubmitPatientShortQuestionnaire } from 'helper/patientHelper';
import { getCountry } from 'helper/stepsDefinitions';

// Components
import WizardButtons from 'components/WizardButtons';
import Recaptcha from 'components/Recaptcha';

// Styles
import OptionList from 'components/OptionList';
import {
  QuestionText, MainContainer, QuestionInput, TempBeforeSubmitError,
} from '../style';

const schema = Yup.object({
  symptomsStartedDate: Yup.string().when('$country', {
    is: 'Japan',
    then: Yup.string().required(),
    else: Yup.string().required().test('symptomsStartedDate-invalid', '', value => {
      let result = true;
      if (value && !value.match(/^[0-9]+$/)) {
        result = false;
      }
      return result;
    }),
  }),
}).defined();

type Step4bType = Yup.InferType<typeof schema>;

const Step4b = ({
  previousStep,
  nextStep,
  storeKey,
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
  const isShortQuestionary = metadata?.isShortQuestionary;

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    resolver: yupResolver(schema),
    context: {
      country,
    },
  });
  const { errors, isSubmitting, isValid } = formState;

  useEffect(() => {
    if (!captchaValue) {
      setSubmitError(null);
    }
  }, [captchaValue]);

  const renderCaptcha = React.useMemo(() => {
    if (isShortQuestionary && (country !== 'Colombia')) {
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
  }, [country, isShortQuestionary, submitError]);

  // Handlers

  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  const onSubmit = async (values: Step4bType) => {
    if (values) {
      action(values);
      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };
  const onSubmitPatientShortQuestionnaire = async (values: Step4bType) => {
    if (values) {
      action(values);
      await doSubmitPatientShortQuestionnaire({
        setSubmitError: s => setSubmitError(!s ? null : t(s)),
        state: {
          ...state,
          'submit-steps': {
            ...state['submit-steps'],
            ...values,
          },
        },
        captchaValue,
        action,
        nextStep,
        setActiveStep,
        history,
      });
    }
  };

  useEffect(() => {
    scrollToTop();
    setTitle(t('questionary:symptomsDateTitle'));
    setType('primary');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, t]);

  const getLeftLabel = () => {
    if (isShortQuestionary) {
      if (isSubmitting) {
        return t('questionary:submitting');
      }
      return t('beforeSubmit:submitButton');
    }
    return t('questionary:nextButton');
  };

  return (
    <MainContainer>
      <QuestionText extraSpace first>
        {t('questionary:symptomsDate')}
      </QuestionText>
      <Controller
        control={control}
        name="symptomsStartedDate"
        defaultValue=""
        render={({ onChange, value, name }) => (
          country === 'Japan' ? (
            <OptionList
              singleSelection
              value={{ selected: value ? [value] : [] }}
              onChange={v => onChange(v.selected[0])}
              items={[
                {
                  value: 'none',
                  label: t('questionary:options.none'),
                },
                {
                  value: 'today',
                  label: t('questionary:options.today'),
                },
                {
                  value: 'days',
                  label: t('questionary:options.days'),
                },
                {
                  value: 'week',
                  label: t('questionary:options.week'),
                },
                {
                  value: 'overWeek',
                  label: t('questionary:options.overWeek'),
                },
              ]}
            />
          ) : (
            <QuestionInput
              name={name}
              value={value}
              onChange={onChange}
              type="text"
              placeholder={t('questionary:enterDays')}
              autoComplete="Off"
            />
          )
        )}
      />
      {/* Bottom Buttons */}
      <p><ErrorMessage errors={errors} name="name" /></p>
      {activeStep && (
        <Portal>
          {renderCaptcha}
          <WizardButtons
            leftLabel={getLeftLabel()}
            leftHandler={isShortQuestionary ? handleSubmit(onSubmitPatientShortQuestionnaire) : handleSubmit(onSubmit)}
            leftDisabled={(isShortQuestionary && (country !== 'Colombia')) ? (isSubmitting || (recaptchaAvailable && !captchaValue)) : !isValid}
            invert
          />
        </Portal>
      )}
    </MainContainer>
  );
};

export default React.memo(Step4b);
