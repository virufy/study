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
import OptionList from 'components/OptionList';
import DatePicker from 'components/DatePicker';
import WizardButtons from 'components/WizardButtons';
import { QuestionText, QuestionRequiredIndicatorText, QuestionStepIndicator } from '../style';

const schema = Yup.object({
  pcrTestDate: Yup.date().when('$hasPcr', { is: true, then: Yup.date().required(), otherwise: Yup.date() }),
  pcrTestResult: Yup.string().when('$hasPcr', { is: true, then: Yup.string().required(), otherwise: Yup.string() }),
  antigenTestDate: Yup.date().when('$hasAntigen', { is: true, then: Yup.date().required(), otherwise: Yup.date() }),
  antigenTestResult: Yup.string().when('$hasAntigen', { is: true, then: Yup.string().required(), otherwise: Yup.string() }),
}).defined();

type Step1aType = Yup.InferType<typeof schema>;

const Step1b = ({
  previousStep,
  nextStep,
  storeKey,
}: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const { setDoGoBack, setTitle } = useHeaderContext();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const { state, action } = useStateMachine(updateAction(storeKey));

  // States
  const [activeStep, setActiveStep] = React.useState(true);
  const [hasPcrTest, setHasPcrTest] = React.useState(false);
  const [hasAntigenTest, setHasAntigenTest] = React.useState(false);

  useEffect(() => {
    if (state) {
      const { testTaken } = state['submit-steps'];

      setHasPcrTest(testTaken.includes('pcr'));
      setHasAntigenTest(testTaken.includes('antigen'));
    }
  }, [state]);

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    context: {
      hasPcr: state['submit-steps'].testTaken.includes('pcr'),
      hasAntigen: state['submit-steps'].testTaken.includes('antigen'),
    },
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
    setTitle(t('questionary:headerText2'));
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, t]);

  // Handlers
  const onSubmit = async (values: Step1aType) => {
    if (values) {
      const {
        pcrTestDate,
        pcrTestResult,
        antigenTestDate,
        antigenTestResult,
      } = (values as any);

      if (hasPcrTest && (!pcrTestDate || !pcrTestResult)) {
        return;
      }
      if (hasAntigenTest && (!antigenTestDate || !antigenTestResult)) {
        return;
      }

      action(values);
      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  return (
    <>
      {hasPcrTest && (
        <>
          <QuestionText extraSpace first>
            {t('questionary:whenPcrTest')}<QuestionRequiredIndicatorText> *</QuestionRequiredIndicatorText>
          </QuestionText>

          <Controller
            control={control}
            name="pcrTestDate"
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

          <QuestionText extraSpace>
            {t('questionary:resultPcrTest.question')}<QuestionRequiredIndicatorText> *</QuestionRequiredIndicatorText>
          </QuestionText>
          <Controller
            control={control}
            name="pcrTestResult"
            defaultValue={undefined}
            render={({ onChange, value }) => (
              <OptionList
                singleSelection
                value={{ selected: value ? [value] : [] }}
                onChange={v => onChange(v.selected[0])}
                items={[
                  {
                    value: 'positive',
                    label: t('questionary:resultPcrTest.options.positive'),
                  },
                  {
                    value: 'negative',
                    label: t('questionary:resultPcrTest.options.negative'),
                  },
                  {
                    value: 'pending',
                    label: t('questionary:resultPcrTest.options.pending'),
                  },
                ]}
              />
            )}
          />
        </>
      )}
      {hasAntigenTest && (
        <>
          <QuestionText extraSpace first={!hasPcrTest}>
            {t('questionary:whenAntigenTest')}<QuestionRequiredIndicatorText> *</QuestionRequiredIndicatorText>
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

          <QuestionText extraSpace>
            {t('questionary:resultAntigenTest.question')}<QuestionRequiredIndicatorText> *</QuestionRequiredIndicatorText>
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
                items={[
                  {
                    value: 'positive',
                    label: t('questionary:resultAntigenTest.options.positive'),
                  },
                  {
                    value: 'negative',
                    label: t('questionary:resultAntigenTest.options.negative'),
                  },
                  {
                    value: 'pending',
                    label: t('questionary:resultAntigenTest.options.pending'),
                  },
                ]}
              />
            )}
          />
        </>
      )}
      {/* Bottom Buttons */}
      <p><ErrorMessage errors={errors} name="name" /></p>
      {activeStep && (
        <Portal>
          <QuestionStepIndicator />
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

export default React.memo(Step1b);
