import React, { useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import usePortal from 'react-useportal';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers';
import { ErrorMessage } from '@hookform/error-message';
import * as Yup from 'yup';

// Components
import WizardButtons from 'components/WizardButtons';
import Link from 'components/Link';
import Checkbox from 'components/Checkbox';
import { BlackText } from 'components/Texts';

// Update Action
import { updateAction } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Hooks
import useEmbeddedFile from 'hooks/useEmbeddedFile';

// Utils
import { buildConsentFilePath } from 'helper/consentPathHelper';
import { scrollToTop } from 'helper/scrollHelper';

// Data
import { privacyPolicy } from 'data/privacyPolicy';
import { consentPdf } from 'data/consentPdf';

// Styles
import {
  ContainerShapeDown,
  InnerContainerShapeDown,
  WelcomeContent,
  WelcomeStyledFormAlternative,
  WelcomeConsentForm,
  CheckboxTitle,
} from '../style';

const schema = Yup.object().shape({
  agreedConsentTerms: Yup.boolean().required().default(false).oneOf([true]),
  agreedPolicyTerms: Yup.boolean().required().default(false).oneOf([true]),
  agreedCovidCollection: Yup.boolean().when('$country', {
    is: 'Global',
    then: Yup.boolean().required().default(false).oneOf([true]),
    otherwise: Yup.boolean().notRequired(),
  }),
  agreedCovidDetection: Yup.boolean().when('$country', {
    is: 'Brazil',
    then: Yup.boolean().notRequired(),
    otherwise: Yup.boolean().required().default(false).oneOf([true]),
  }),
  agreedTrainingArtificial: Yup.boolean().required().default(false).oneOf([true]),
  agreedBiometric: Yup.boolean().when('$country', {
    is: 'Brazil',
    then: Yup.boolean().notRequired(),
    otherwise: Yup.boolean().required().default(false).oneOf([true]),
  }),
});

type Step3Type = Yup.InferType<typeof schema>;

const Step4 = (p: Wizard.StepProps) => {
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const [activeStep, setActiveStep] = React.useState(true);
  const { setType, setDoGoBack, setSubtitle } = useHeaderContext();

  const { state, action } = useStateMachine(updateAction(p.storeKey));

  const store = state?.[p.storeKey];

  const currentCountry: PrivacyPolicyCountry = useMemo(() => {
    if (['Argentina', 'Bolivia', 'Colombia', 'Peru', 'Mexico', 'Brazil', 'United States'].includes(state.welcome.country)) {
      return state.welcome.country;
    }
    return 'Global';
  }, [state.welcome.country]);

  const {
    control, handleSubmit, formState,
  } = useForm({
    defaultValues: store,
    resolver: yupResolver(schema),
    context: {
      country: currentCountry,
    },
    mode: 'onChange',
  });
  const { errors, isValid } = formState;
  const history = useHistory();
  const { isLoadingFile, file: consentFormContent } = useEmbeddedFile(
    buildConsentFilePath(currentCountry, state.welcome.language),
  );

  const onSubmit = async (values: Step3Type) => {
    if (values) {
      action(values);
      if (p.nextStep) {
        setActiveStep(false);
        history.push(p.nextStep);
      }
    }
  };

  const doBack = useCallback(() => {
    if (p.previousStep) {
      setActiveStep(false);
      history.push(p.previousStep);
    } else {
      history.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();

  useEffect(() => {
    scrollToTop();
    setDoGoBack(() => doBack);
    setType('secondary');
    setSubtitle(t('consent:title'));
  }, [doBack, setDoGoBack, setType, setSubtitle, t]);

  const getCurrentCountryCheckbox = (country: PrivacyPolicyCountry) => {
    if (country === 'Brazil') {
      return 'pt';
    }
    if (country === 'Global' || country === 'United States') {
      return 'en';
    }
    return 'es';
  };

  return (
    <WelcomeStyledFormAlternative>
      <ContainerShapeDown>
        <InnerContainerShapeDown>
          <BlackText>
            <Trans i18nKey="consent:paragraph1">
              Virufy cares about your privacy and is advised by licensed data privacy experts.
              The information and recordings you provide will only be used for the purposes described in our
              <Link to={privacyPolicy[currentCountry]} target="_blank">Privacy Policy</Link> and consent form.
              Please read the consent Form:
            </Trans>
          </BlackText>
        </InnerContainerShapeDown>
      </ContainerShapeDown>
      <WelcomeContent>
        <WelcomeConsentForm dangerouslySetInnerHTML={{ __html: isLoadingFile ? 'Loading...' : consentFormContent }} />

        <BlackText>
          <Trans i18nKey="consent:paragraph3">
            By checking the below boxes, you are granting your explicit, freely given, and informed consent to Virufy to
            collect, process, and share your information for the purposes indicated above and as provided in greater
            detail in our <Link to={privacyPolicy[currentCountry]} target="_blank">Privacy Policy</Link>. You can print
            a copy of this Consent Form for your personal records by
            accessing <Link to={consentPdf[currentCountry]} target="_blank">Privacy Policy</Link>
          </Trans>
        </BlackText>

        {store?.country === 'Brazil' && (
          <BlackText>
            <Trans i18nKey="consent:paragraph3_brazil">
              If you are located inside Brazilian national territory, and for the purposes of the General Personal Data
              Protection Law (&quot;LGPD&quot;), &quot;consent&quot;, in its free, informed, and unequivocal
              pronouncement, will be the legal basis on which we process sensitive personal data.
            </Trans>
          </BlackText>
        )}

        <CheckboxTitle>
          {t('consent:pleaseConfirm', 'Please confirm the following:')}
        </CheckboxTitle>

        <Controller
          control={control}
          name="agreedConsentTerms"
          defaultValue={false}
          render={({ onChange, value }) => (
            <Checkbox
              id="Step2-ConsentTerms"
              label={(currentCountry !== 'Brazil')
                ? (
                  <Trans tOptions={{ lng: getCurrentCountryCheckbox(currentCountry) }} i18nKey="consent:certify">
                    I certify that I am at least 18 years old and agree to the terms of this Consent Form.
                  </Trans>
                ) : (
                  <Trans tOptions={{ lng: getCurrentCountryCheckbox(currentCountry) }} i18nKey="consent:certifyBrazil">
                    I certify that I am at least 18 years old and agree to the terms of this Consent Form,
                    hereby expressly consenting to the collection and processing of my personal information,
                    biometric information, and health information.
                  </Trans>
                )}
              name="agreedConsentTerms"
              onChange={e => onChange(e.target.checked)}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="agreedPolicyTerms"
          defaultValue={false}
          render={({ onChange, value }) => (
            <Checkbox
              id="Step2-PolicyTerms"
              label={(
                <Trans tOptions={{ lng: getCurrentCountryCheckbox(currentCountry) }} i18nKey="consent:agree">
                  I agree to the terms of the Virufy
                  <Link to={privacyPolicy[currentCountry]} target="_blank">Privacy Policy</Link>
                </Trans>
              )}
              name="agreedPolicyTerms"
              onChange={e => onChange(e.target.checked)}
              value={value}
            />
          )}
        />

        {currentCountry === 'Global' && (
          <Controller
            control={control}
            name="agreedCovidCollection"
            defaultValue={false}
            render={({ onChange, value, name }) => (
              <Checkbox
                id="Step2-CollectionCovid"
                label={(
                  <Trans tOptions={{ lng: getCurrentCountryCheckbox(currentCountry) }} i18nKey="consent:collection">
                    I hereby expressly consent to the collection and
                    processing of my personal information, biometric information, and health information.
                  </Trans>
            )}
                name={name}
                onChange={e => onChange(e.target.checked)}
                value={value}
              />
            )}
          />
        )}

        {currentCountry !== 'Brazil' && (
          <Controller
            control={control}
            name="agreedCovidDetection"
            defaultValue={false}
            render={({ onChange, value, name }) => (
              <Checkbox
                id="Step2-DetectionCovid"
                label={(
                  <Trans tOptions={{ lng: getCurrentCountryCheckbox(currentCountry) }} i18nKey="consent:detection">
                    I hereby acknowledge and agree that processing shall be done for the purposes indicated above
                    and, in particular but without limitation, for research and compiling a dataset needed for the
                    development of artificial intelligence algorithms for device-based COVID-19 detection.
                  </Trans>
            )}
                name={name}
                onChange={e => onChange(e.target.checked)}
                value={value}
              />
            )}
          />
        )}

        <Controller
          control={control}
          name="agreedTrainingArtificial"
          defaultValue={false}
          render={({ onChange, value, name }) => (
            <Checkbox
              id="Step2-TrainingArtificial"
              label={(
                <Trans tOptions={{ lng: getCurrentCountryCheckbox(currentCountry) }} i18nKey="consent:signs">
                  I hereby acknowledge and agree that processing shall be done for the purposes indicated above
                  and, in particular but without limitation, for training artificial intelligence algorithms to
                  analyze cough audio recordings to better determine signs of COVID-19.
                </Trans>
          )}
              name={name}
              onChange={e => onChange(e.target.checked)}
              value={value}
            />
          )}
        />
        {currentCountry !== 'Brazil' && (
          <Controller
            control={control}
            name="agreedBiometric"
            defaultValue={false}
            render={({ onChange, value, name }) => (
              <Checkbox
                id="Step2-Biometric"
                label={(
                  <Trans tOptions={{ lng: getCurrentCountryCheckbox(currentCountry) }} i18nKey="consent:biometric">
                    I hereby expressly consent to the sharing of my personal information,
                    biometric information, and health information with third parties as described
                    in this Consent Form and/or the Virufy Privacy Policy..
                  </Trans>
            )}
                name={name}
                onChange={e => onChange(e.target.checked)}
                value={value}
              />
            )}
          />
        )}

        <p><ErrorMessage errors={errors} name="name" /></p>
        {activeStep && (
          <Portal>
            <WizardButtons
              invert
              leftLabel={t('consent:nextButton')}
              leftHandler={handleSubmit(onSubmit)}
              leftDisabled={!isValid}
            />
          </Portal>
        )}
      </WelcomeContent>
    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(Step4);
