import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStateMachine } from 'little-state-machine';

// Form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';

// Icons
import { ReactComponent as ExclamationSVG } from 'assets/icons/exclamationCircle.svg';

// Components
import CreatedBy from 'components/CreatedBy';

// Modals
import CountryErrorModal from 'modals/CountryErrorModal';

// Update Action
import { updateAction, resetStore } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Data
import { languageData } from 'data/lang';
import { countryData, countriesWithStates, CountryDataProps } from 'data/country';
import { getHospitalIdFor } from 'data/hospitalId';

// Helper
import { scrollToTop } from 'helper/scrollHelper';
import { isClinic } from 'helper/basePathHelper';

// Styles
import {
  WelcomeContent, WelcomeStyledForm, LogoSubtitle,
  RegionContainer, WelcomeInput, ContainerNextButton, NextButton, ArrowRightSVG,
  BoldBlackText, CustomPurpleText, SupportedBy, NuevaLogo, WelcomeSelect, TextErrorContainer,
} from '../style';

declare interface OptionsProps {
  label: string;
  value: string;
}

let invalidCountries = ['India', 'France', 'Italy', 'Netherlands', 'Belgium', 'Luxembourg', 'Japan', 'Germany', 'Pakistan'];
const clinicCountries = ['India', 'Colombia', 'Pakistan'];

if (isClinic) {
  invalidCountries = invalidCountries.filter(a => !clinicCountries.includes(a));
}

const schema = Yup.object().shape({
  country: Yup.string().required().notOneOf(invalidCountries),
  language: Yup.string().required(),
  region: Yup.string().when('country', {
    is: (val: string) => countriesWithStates.includes(val),
    then: Yup.string().required('regionRequired'),
    else: Yup.string(),
  }),
  patientId: Yup.string().when('$isClinical', {
    is: true,
    then: Yup.string().required(),
    else: Yup.string().notRequired(),
  }),
  hospitalId: Yup.string().when('$isClinical', {
    is: true,
    then: Yup.string().required(),
    else: Yup.string().notRequired(),
  }),
}).defined();

type Step1Type = Yup.InferType<typeof schema>;

const Step1 = (p: Wizard.StepProps) => {
  const [activeStep, setActiveStep] = React.useState(true);
  const {
    setType, setDoGoBack, setLogoSize,
  } = useHeaderContext();
  const resetExecuted = React.useRef(false);

  const { state, actions } = useStateMachine({ update: updateAction(p.storeKey), reset: resetStore() });

  const store = state?.[p.storeKey];

  const {
    control,
    formState,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: store,
    context: {
      isClinical: isClinic,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const history = useHistory();
  const { isValid, errors } = formState;

  useEffect(() => {
    if (resetExecuted.current) {
      resetExecuted.current = false;
      reset(store);
    }
  }, [store, reset]);

  useEffect(() => {
    if (isClinic) {
      actions.reset({});
      resetExecuted.current = true;
    }
  }, []);

  const onSubmit = async (values: Step1Type) => {
    if (values) {
      actions.update(values);
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
    setValue('region', '');
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n, lang]);

  const invalidCountryModal = React.useMemo(() => invalidCountries.includes(country),
  // eslint-disable-next-line react-hooks/exhaustive-deps
    [country]);

  const regionSelectOptions = useMemo(() => {
    const output = [
      { label: t('main:selectRegion'), value: '' },
    ];
    if (country) {
      const elem = countryData.find(a => a.value === country);
      if (elem) {
        elem.states.forEach(s => {
          output.push({ label: s, value: s });
        });
      }
    }
    return output;
  }, [t, country]);

  const hospitalIdOptions = useMemo(() => getHospitalIdFor(country), [country]);

  const getClinicCountries = () => countryData.filter(item => clinicCountries.includes(item.value));

  const getOptionsCountry = () => {
    const options = isClinic ? getClinicCountries() : countryData;
    const formattedOptions = options.reduce((acc: CountryDataProps[], current) => {
      acc.push({ ...current, label: t(`main:countries.${current.value}`) });
      return acc;
    }, []);
    return formattedOptions;
  };

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
          {isClinic
          && (
            <SupportedBy>
              {t('main:supportedBy', 'Supported by')}
              <NuevaLogo />
            </SupportedBy>
          )}

          <BoldBlackText>
            {t('main:selectYourLanguage', 'Language')}
          </BoldBlackText>

          {/* Language */}
          <Controller
            control={control}
            name="language"
            defaultValue={languageData[0].value}
            render={({ onChange, value: valueController }) => (
              <WelcomeSelect
                placeholder={t('main.selectYourLanguage', 'Language')}
                options={isClinic ? languageData : languageData.filter(l => l.value !== 'ja')}
                onChange={(e: any) => { onChange(e?.value); }}
                value={languageData.filter(({ value }) => value === valueController)}
                className="custom-select"
                classNamePrefix="custom-select"
              />
            )}
          />

          <BoldBlackText>
            {t('main:selectLocation', 'Location')}
          </BoldBlackText>

          <Controller
            control={control}
            name="country"
            defaultValue=""
            render={({ onChange, value: valueController }) => (
              <WelcomeSelect
                placeholder={t('main:selectCountry', 'Select country')}
                options={getOptionsCountry()}
                onChange={(e: any) => { onChange(e?.value); resetRegion(); }}
                value={getOptionsCountry().filter(({ value }) => value === valueController)}
                className="custom-select"
                classNamePrefix="custom-select"
                noOptionsMessage={({ inputValue }) => (
                  !inputValue ? `${t('main:noOptionsError')}` : `${t('main:noValueError')}`
                )}
              />
            )}
          />

          <Controller
            control={control}
            name="region"
            defaultValue=""
            render={({ onChange, value: valueController }) => (regionSelectOptions.length > 1 ? (
              <>
                <BoldBlackText>
                  {t('main:region', 'Region')}
                </BoldBlackText>

                <RegionContainer>
                  <WelcomeSelect
                    options={regionSelectOptions}
                    onChange={(e: any) => { onChange(e?.value); }}
                    value={regionSelectOptions.filter(({ value }) => value === valueController) || ''}
                    className="custom-select"
                    classNamePrefix="custom-select"
                    error={errors.region}
                  />
                  {errors.region && (
                    <TextErrorContainer>
                      <ExclamationSVG />
                      {t(errors.region.message, 'Please select a region')}
                    </TextErrorContainer>
                  )}
                </RegionContainer>
              </>
            ) : <></>)}
          />
          {isClinic && (
            <>
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
                    autoComplete="Off"
                  />
                )}
              />
              <BoldBlackText>
                {t('main:hospitalId', 'Enter hospital ID:')}
              </BoldBlackText>
              <Controller
                control={control}
                name="hospitalId"
                defaultValue=""
                render={({ onChange, value: valueController, name }) => (
                  hospitalIdOptions?.length > 0 ? (
                    <WelcomeSelect
                      options={hospitalIdOptions}
                      onChange={(e: any) => { onChange(e?.value); }}
                      value={hospitalIdOptions.filter(({ value }) => value === valueController) || ''}
                      className="custom-select"
                      classNamePrefix="custom-select"
                    />
                  ) : (
                    <WelcomeInput
                      name={name}
                      value={valueController}
                      onChange={onChange}
                      type="text"
                      autoComplete="Off"
                    />
                  )
                )}
              />
            </>
          )}
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
      <CountryErrorModal
        isOpen={invalidCountryModal}
        modalTitle="Oops."
      >
        {t('main:errorCountry', 'We are unable to collect coughs from your region at this time. Check back with us soon!')}
      </CountryErrorModal>
    </>
  );
};

export default React.memo(Step1);
