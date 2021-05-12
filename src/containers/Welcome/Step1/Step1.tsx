import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation, Trans } from 'react-i18next';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';

// Components
import WizardButtons from 'components/WizardButtons';
import Dropdown from 'components/Dropdown';
import CreatedBy from 'components/CreatedBy';

// Update Action
import { updateAction } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Data
import { languageData } from 'data/lang';
import { countryData, countriesWithStates } from 'data/country';

// Hooks
import useWindowSize from 'hooks/useWindowSize';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  WelcomeLogo, WelcomeLogoText, WelcomeNote, WelcomeTitle, WelcomeContent, WelcomeSubtitle, WelcomeStyledForm,
  WelcomeRequiredFieldText, RegionContainer, WelcomeInput,
} from '../style';

const schema = Yup.object().shape({
  country: Yup.string().required(),
  language: Yup.string().required(),
  region: Yup.string().when('country', {
    is: (val: string) => countriesWithStates.includes(val),
    then: Yup.string().required(),
    else: Yup.string(),
  }),
}).defined();

type Step1Type = Yup.InferType<typeof schema>;

const Step1 = (p: Wizard.StepProps) => {
  const { width } = useWindowSize();

  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const [activeStep, setActiveStep] = React.useState(true);
  const { doGoBack, setDoGoBack, setLogoSize } = useHeaderContext();

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
      if (p.nextStep) {
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
    if (doGoBack) setDoGoBack(null);

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
      <WelcomeStyledForm mt="-4px">
        <WelcomeLogo />
        <WelcomeLogoText>
          {t('main:logoIntro', 'An Independent Nonprofit Research Organization')}
        </WelcomeLogoText>

        <WelcomeTitle
          fontSize={width && width > 560 ? 32 : 24}
          mt={48}
        >
          {t('main:title')}
        </WelcomeTitle>

        <WelcomeContent>
          <WelcomeSubtitle
            fontWeight={700}
            mb={0}
            mt={width && width > 560 ? 0 : 18}
            textAlign={width && width > 560 ? 'center' : 'left'}
          >
            {t('main:paragraph1')}
          </WelcomeSubtitle>

          <WelcomeSubtitle
            mt={width && width > 560 ? 50 : 32}
            mb={width && width > 560 ? 50 : 16}
            fontWeight={400}
            textAlign={width && width > 560 ? 'center' : 'left'}
          >
            Please select your language.
          </WelcomeSubtitle>
          <Controller
            control={control}
            name="language"
            defaultValue={i18n.language.split('-')[0] || languageData[0].code}
            render={({ onChange, value }) => (
              <Dropdown onChange={e => onChange(e.currentTarget.value)} value={value}>
                {languageData.map(({ code, label }) => <option key={code} id={code} value={code}>{label}</option>)}
              </Dropdown>
            )}
          />

          <WelcomeSubtitle
            mt={width && width > 560 ? 50 : 32}
            mb={width && width > 560 ? 50 : 16}
            fontWeight={400}
            textAlign={width && width > 560 ? 'center' : 'left'}
          >
            {t('main:paragraph2')}
            <WelcomeRequiredFieldText> *</WelcomeRequiredFieldText>
          </WelcomeSubtitle>

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

          <WelcomeSubtitle
            mt={width && width > 560 ? 50 : 32}
            mb={width && width > 560 ? 50 : 16}
            fontWeight={400}
            textAlign={width && width > 560 ? 'center' : 'left'}
          >
            {t('main:patientId', 'If you are part of a clinical study, please enter your patient ID:')}
          </WelcomeSubtitle>
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

          <WelcomeNote>
            <Trans i18nKey="main:note">
              <strong>Please note:</strong> This form is for data collection only. It will not predict your COVID-19
              status or diagnose any disease, disorder, or other health condition. Virufy is conducting research and
              will use the information you provide for that research only. Virufy will not take place of a doctor and
              would like to remind you it is your responsibility to seek medical advice from your doctor.
            </Trans>
          </WelcomeNote>

          {activeStep && (
            <Portal>
              <WizardButtons
                leftLabel={t('main:nextButton')}
                leftHandler={handleSubmit(onSubmit)}
                leftDisabled={!isValid}
                invert
              />
              <CreatedBy inline />
            </Portal>
          )}

        </WelcomeContent>
      </WelcomeStyledForm>
    </>
  );
};

export default React.memo(Step1);
