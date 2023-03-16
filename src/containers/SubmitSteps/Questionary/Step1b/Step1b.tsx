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
import DatePicker from 'components/DatePicker';
import WizardButtons from 'components/WizardButtons';
import Recaptcha from 'components/Recaptcha';

// Styles
import {
  QuestionText, MainContainer, TempBeforeSubmitError, QuestionAllApply,
} from '../style';

const schemaWithoutPatient = Yup.object({
  pcrTestDate: Yup.date().when('$hasPcr', { is: true, then: Yup.date().required(), otherwise: Yup.date() }),
  pcrTestResult: Yup.string().when('$hasPcr', { is: true, then: Yup.string().required(), otherwise: Yup.string() }),
  antigenTestDate: Yup.date().when('$hasAntigen', { is: true, then: Yup.date().required(), otherwise: Yup.date() }),
  whatAntigenTestResult: Yup.string().when('$country', {
    is: 'Japan',
    then: Yup.string().when('$hasAntigen', { is: true, then: Yup.string().required(), otherwise: Yup.string() }),
    otherwise: Yup.string().notRequired(),
  }),
  antigenTestResult: Yup.string().when('$hasAntigen', { is: true, then: Yup.string().required(), otherwise: Yup.string() }),
/* antibodyTestDate: Yup.date().when('$hasAntibody', { is: true, then: Yup.date().required(), otherwise: Yup.date() }),
antibodyTestResult: Yup.string().when('$hasAntibody', { is: true, then: Yup.string().required(),
otherwise: Yup.string() }), */
}).defined();

const schemaWithPatient = Yup.object({
  patientAntigenTestResult: Yup.string().oneOf(['positive', 'negative', '']).when('patientPcrTestResult', (value: string, schema: any) => (!value ? schema.required() : schema)),
  patientPcrTestResult: Yup.string().oneOf(['positive', 'negative', '']),
}).defined();

type Step1aType = Yup.InferType<typeof schemaWithoutPatient> | Yup.InferType<typeof schemaWithPatient>;

const Step1b = ({
  previousStep,
  nextStep,
  storeKey,
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
  const [hasPcrTest, setHasPcrTest] = React.useState(false);
  const [hasAntigenTest, setHasAntigenTest] = React.useState(false);
  // const [hasAntibodyTest, setHasAntibodyTest] = React.useState(false);

  useEffect(() => {
    if (state) {
      const { testTaken } = state['submit-steps'] || {};

      setHasPcrTest(testTaken?.includes('pcr') ?? false);
      setHasAntigenTest(testTaken?.includes('antigen') ?? false);
      // setHasAntibodyTest(testTaken.includes('antibody'));
    }
  }, [state]);

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    context: {
      hasPcr: state['submit-steps']?.testTaken?.includes('pcr') ?? false,
      hasAntigen: state['submit-steps']?.testTaken?.includes('antigen') ?? false,
      // hasAntibody: state['submit-steps'].testTaken.includes('antibody'),
      country,
    },
    resolver: yupResolver(patientId ? schemaWithPatient : schemaWithoutPatient),
  });
  const { errors, isValid } = formState;

  /* Delete after Contact info step is re-integrated */
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
  const [recaptchaAvailable, setRecaptchaAvailable] = React.useState(true);
  const { isSubmitting } = formState;

  useEffect(() => {
    if (!captchaValue) {
      setSubmitError(null);
    }
  }, [captchaValue]);

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
    if (patientId) {
      setTitle('');
    } else {
      setTitle(t('questionary:testTaken.title'));
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
  const onSubmit = async (values: Step1aType) => {
    if (values) {
      const {
        pcrTestDate,
        pcrTestResult,
        antigenTestDate,
        antigenTestResult,
        whatAntigenTestResult,
        // antibodyTestDate,
        // antibodyTestResult,
      } = (values as any);
      // if patient
      if (hasPcrTest && (!pcrTestDate || !pcrTestResult)) {
        return;
      }
      if (country === 'Japan' && hasAntigenTest && (!antigenTestDate || !antigenTestResult || !whatAntigenTestResult)) {
        return;
      }
      if (hasAntigenTest && (!antigenTestDate || !antigenTestResult)) {
        return;
      }
      /* if (hasAntibodyTest && (!antibodyTestDate || !antibodyTestResult)) {
        return;
      } */

      action(values);
      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  // Memos
  const pcrOptions = React.useMemo(() => {
    if (country === 'Japan') {
      return [
        {
          value: 'positive',
          label: t('questionary:resultPcrTest.options.positive'),
        },
        {
          value: 'negative',
          label: t('questionary:resultPcrTest.options.negative'),
        },
        {
          value: 'unsure',
          label: t('questionary:resultPcrTest.options.unsure'),
        },
      ];
    }
    return [
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
      {
        value: 'unsure',
        label: t('questionary:resultPcrTest.options.unsure'),
      },
    ];
  }, [country, t]);

  const antigenOptions = React.useMemo(() => {
    if (country === 'Japan') {
      return [
        {
          value: 'positive',
          label: t('questionary:resultAntigenTest.options.positive'),
        },
        {
          value: 'negative',
          label: t('questionary:resultAntigenTest.options.negative'),
        },
      ];
    }
    return [
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
      {
        value: 'unsure',
        label: t('questionary:resultAntigenTest.options.unsure'),
      },
    ];
  }, [country, t]);

  return (
    <MainContainer>
      {(!patientId && hasPcrTest) && (
        <>
          <QuestionText extraSpace first>{t('questionary:whenPcrTest')}
            {
              country === 'Japan' && (
                <QuestionAllApply>{t('questionary:whenPcrTestCaption')}</QuestionAllApply>
              )
            }
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
            {t('questionary:resultPcrTest.question')}
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
                items={pcrOptions}
              />
            )}
          />
        </>
      )}
      {(!patientId && hasAntigenTest) && (
        <>
          <QuestionText extraSpace first={!hasPcrTest}>
            {t('questionary:whenAntigenTest')}
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

          {
            country === 'Japan' && (
              <>
                <QuestionText extraSpace>
                  {t('questionary:whatAntigenTest.question')}
                </QuestionText>
                <Controller
                  control={control}
                  name="whatAntigenTestResult"
                  defaultValue={undefined}
                  render={({ onChange, value }) => (
                    <OptionList
                      singleSelection
                      value={{ selected: value ? [value] : [] }}
                      onChange={v => onChange(v.selected[0])}
                      items={[
                        {
                          value: 'medical',
                          label: t('questionary:whatAntigenTest.options.medical'),
                        },
                        {
                          value: 'research',
                          label: t('questionary:whatAntigenTest.options.research'),
                        },
                        {
                          value: 'unknown',
                          label: t('questionary:whatAntigenTest.options.unknown'),
                        },
                      ]}
                    />
                  )}
                />
              </>
            )
          }

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
        </>
      )}
      {/* {hasAntibodyTest && (
        <>
          <QuestionText extraSpace first={!hasPcrTest}>
            {t('questionary:whenAntibodyTest')}
          </QuestionText>

          <Controller
            control={control}
            name="antibodyTestDate"
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
            {t('questionary:resultAntibodyTest.question')}
          </QuestionText>
          <Controller
            control={control}
            name="antibodyTestResult"
            defaultValue={undefined}
            render={({ onChange, value }) => (
              <OptionList
                singleSelection
                value={{ selected: value ? [value] : [] }}
                onChange={v => onChange(v.selected[0])}
                items={[
                  {
                    value: 'positive',
                    label: t('questionary:resultAntibodyTest.options.positive'),
                  },
                  {
                    value: 'negative',
                    label: t('questionary:resultAntibodyTest.options.negative'),
                  },
                  {
                    value: 'pending',
                    label: t('questionary:resultAntibodyTest.options.pending'),
                  },
                  {
                    value: 'unsure',
                    label: t('questionary:resultAntibodyTest.options.unsure'),
                  },
                ]}
              />
            )}
          />
        </>
      )} */}
      {patientId && (
        <>
          <QuestionText extraSpace>
            <Trans i18nKey="questionary:patient:resultPcrTest.question">
              What was the result of Patient {patientId}&apos;s PCR-based COVID-19 test?
            </Trans>
          </QuestionText>
          <Controller
            control={control}
            name="patientPcrTestResult"
            defaultValue=""
            render={({ onChange, value }) => (
              <OptionList
                singleSelection
                value={{ selected: value ? [value] : [] }}
                onChange={v => onChange(v.selected[0] || '')}
                items={[
                  {
                    value: 'positive',
                    label: t('questionary:resultPcrTest.options.positive'),
                  },
                  {
                    value: 'negative',
                    label: t('questionary:resultPcrTest.options.negative'),
                  },
                ]}
              />
            )}
          />
          <QuestionText extraSpace>
            <Trans i18nKey="questionary:patient:resultAntigenTest">
              What was the result of Patient {patientId}&apos;s rapid antigen COVID-19 test?
            </Trans>
          </QuestionText>
          <Controller
            control={control}
            name="patientAntigenTestResult"
            defaultValue=""
            render={({ onChange, value }) => (
              <OptionList
                singleSelection
                value={{ selected: value ? [value] : [] }}
                onChange={v => onChange(v.selected[0] || '')}
                items={[
                  {
                    value: 'positive',
                    label: t('questionary:resultAntigenTest.options.positive'),
                  },
                  {
                    value: 'negative',
                    label: t('questionary:resultAntigenTest.options.negative'),
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
          {(() => {
            if (patientId && (country !== 'Colombia')) {
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
          })()}
          <WizardButtons
            leftLabel={(() => {
              if (patientId) {
                if (isSubmitting) {
                  return t('questionary:submitting');
                }
                return t('beforeSubmit:submitButton');
              }
              return t('questionary:nextButton');
            })()}
            leftHandler={handleSubmit(onSubmit)}
            leftDisabled={(patientId && (country !== 'Colombia')) ? (isSubmitting || (recaptchaAvailable && !captchaValue)) : !isValid}
            invert
          />
        </Portal>
      )}
    </MainContainer>
  );
};

export default React.memo(Step1b);
