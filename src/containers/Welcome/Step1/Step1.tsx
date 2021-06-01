import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';

// Components
import Dropdown from 'components/Dropdown';
import CreatedBy from 'components/CreatedBy';

// Update Action
import { updateAction } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Data
import { languageData } from 'data/lang';
import { countryData, countriesWithStates } from 'data/country';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  WelcomeContent, WelcomeStyledForm, LogoSubtitle,
  RegionContainer, WelcomeInput, ContainerNextButton, NextButton, ArrowRightSVG,
  BoldBlackText, CustomPurpleText, SupportedBy, NuevaLogo,
} from '../style';

const schema = Yup.object().shape({
  country: Yup.string().required(),
  language: Yup.string().required(),
  region: Yup.string().when('country', {
    is: (val: string) => countriesWithStates.includes(val),
    then: Yup.string().required(),
    else: Yup.string(),
  }),
  patientId: Yup.string().notRequired(),
}).defined();

type Step1Type = Yup.InferType<typeof schema>;

const Step1 = (p: Wizard.StepProps) => {
  const [activeStep, setActiveStep] = React.useState(true);
  const {
    setType, setDoGoBack, setLogoSize,
  } = useHeaderContext();

  const { state, action } = useStateMachine(updateAction(p.storeKey));

  const store = state?.[p.storeKey];
  const {
    control,
    formState,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: store,
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const history = useHistory();
  const { isValid } = formState;

  const onSubmit = async (values: Step1Type) => {
    if (values) {
      action(values);
      if (values.patientId && p.otherSteps?.nextStepPatient) {
        setActiveStep(false);
        history.push(p.otherSteps.nextStepPatient);
      } else if (p.nextStep) {
        setActiveStep(false);
        history.push(p.nextStep);
      }
    }
  };

  const resetRegion = () => {
    setValue('region', '', {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    scrollToTop();
    // Hide back arrow in header if neccesary
    setDoGoBack(null);
    setType('tertiary');
    setLogoSize('big');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { t, i18n } = useTranslation();

  const lang = watch('language');
  const country = watch('country');

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const countrySelectOptions = useMemo(() => [{ name: t('main:selectCountry'), consentFormUrl: '', val: '' },
    ...countryData], [t]);

  const regionSelectOptions = useMemo(() => {
    const output = [
      { name: t('main:selectRegion'), val: '' },
    ];
    if (country) {
      const elem = countryData.find(a => a.val === country);
      if (elem) {
        elem.states.forEach(s => {
          output.push({ name: s, val: s });
        });
      }
    }
    return output;
  }, [t, country]);

  return (
    <>
      <WelcomeStyledForm>
        <LogoSubtitle>
          {t('main:logoIntro', 'An Independent Nonprofit Research Organization')}
        </LogoSubtitle>
        <WelcomeContent mt={4}>
          <CustomPurpleText mb={8}>
            {t('main:paragraph2', 'Covid-19 Cough Data Collection Study')}
          </CustomPurpleText>
          <SupportedBy>
            Supported by
            <NuevaLogo />
          </SupportedBy>
          <BoldBlackText>
            {t('main:selectYourLanguage', 'Language')}
          </BoldBlackText>

          {/* Language */}
          <Controller
            control={control}
            name="language"
            defaultValue={i18n.language.split('-')[0] || languageData[0].code}
            render={({ onChange, value }) => (
              <Dropdown
                onChange={e => onChange(e.currentTarget.value)}
                value={value}
              >
                {
                  languageData.map(({ code, label }) => (
                    <option
                      key={code}
                      id={code}
                      value={code}
                    >
                      {label}
                    </option>
                  ))
                }
              </Dropdown>
            )}
          />

          <BoldBlackText>
            {t('main:selectLocation', 'Location')}
          </BoldBlackText>

          <Controller
            control={control}
            name="country"
            defaultValue={countrySelectOptions[0].val}
            render={({ onChange, value }) => (
              <Dropdown onChange={e => { onChange(e.currentTarget.value); resetRegion(); }} value={value}>
                {countrySelectOptions.map(({ name, val }) => <option key={name} id={name} value={val}>{name}</option>)}
              </Dropdown>
            )}
          />

          <Controller
            control={control}
            name="region"
            defaultValue={regionSelectOptions[0].val}
            render={({ onChange, value }) => (regionSelectOptions.length > 1 ? (
              <RegionContainer>
                <Dropdown onChange={e => onChange(e.currentTarget.value)} value={value}>
                  {regionSelectOptions.map(({ name, val }) => <option key={name} id={name} value={val}>{name}</option>)}
                </Dropdown>
              </RegionContainer>
            ) : <></>)}
          />
          <BoldBlackText>
            {t('main:patientId', 'Enter patient ID:')}
          </BoldBlackText>
          <Controller
            control={control}
            name="patientId"
            defaultValue=""
            render={({ onChange, value, name }) => (
              <WelcomeInput
                name={name}
                value={value}
                onChange={onChange}
                type="text"
                placeholder={t('main:enterPatientId', 'Enter your patient ID')}
                autoComplete="Off"
              />
            )}
          />

          {
            activeStep && (
              <>
                <ContainerNextButton>
                  <NextButton
                    onClick={handleSubmit(onSubmit)}
                    isDisable={!isValid}
                  >
                    <ArrowRightSVG />
                  </NextButton>
                </ContainerNextButton>
                <CreatedBy inline />
              </>
            )
          }
        </WelcomeContent>
      </WelcomeStyledForm>
    </>
  );
};

export default React.memo(Step1);
