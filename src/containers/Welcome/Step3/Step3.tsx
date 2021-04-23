import React, { useEffect, useCallback } from 'react';
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

// Update Action
import { updateAction } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Hooks
import useWindowSize from 'hooks/useWindowSize';
import useEmbeddedFile from 'hooks/useEmbeddedFile';

// Utils
import { buildConsentFilePath } from 'helper/consentPathHelper';
import { scrollToTop } from 'helper/scrollHelper';

// Data
import { privacyPolicy } from 'data/privacyPolicy';
import { consentPdf } from 'data/consentPdf';

// Styles
import {
  WelcomeLogo,
  WelcomeTitle,
  WelcomeContent,
  WelcomeSubtitle,
  WelcomeStyledFormAlternative,
  WelcomeConsentForm,
  CheckboxTitle,
} from '../style';

const schema = Yup.object().shape({
  agreedConsentTerms: Yup.boolean().required().default(false).oneOf([true]),
  agreedPolicyTerms: Yup.boolean().required().default(false).oneOf([true]),
  agreedCovidDetection: Yup.boolean().when('$country', {
    is: 'Colombia',
    then: Yup.boolean().notRequired(),
    otherwise: Yup.boolean().required().default(false).oneOf([true]),
  }),
  agreedTrainingArtificial: Yup.boolean().when('$country', {
    is: 'Colombia',
    then: Yup.boolean().notRequired(),
    otherwise: Yup.boolean().required().default(false).oneOf([true]),
  }),
  agreeCollectionAndProcessingInfo: Yup.boolean().required().default(false).oneOf([true]),
});

type Step3Type = Yup.InferType<typeof schema>;

const Step3 = (p: Wizard.StepProps) => {
  const { width } = useWindowSize();
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const [activeStep, setActiveStep] = React.useState(true);
  const { setDoGoBack } = useHeaderContext();

  const { state, action } = useStateMachine(updateAction(p.storeKey));

  const store = state?.[p.storeKey];

  const currentCountry: PrivacyPolicyCountry = state.welcome.country;
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

  useEffect(() => {
    scrollToTop();
    setDoGoBack(() => doBack);
  }, [doBack, setDoGoBack]);

  const { t } = useTranslation();
  const p3MarginBottom = (width && width > 560 ? 50 : 27);

  return (
    <WelcomeStyledFormAlternative>
      <WelcomeLogo />

      <WelcomeTitle
        mt={width && width > 560 ? 38 : 12}
        textAlign={width && width > 560 ? 'center' : 'left'}
      >
        {t('consent:title')}
      </WelcomeTitle>

      <WelcomeContent>
        <WelcomeConsentForm dangerouslySetInnerHTML={{ __html: isLoadingFile ? 'Loading...' : consentFormContent }} />

        <WelcomeSubtitle
          fontWeight={400}
          mb={store?.country !== 'Brazil' ? p3MarginBottom : 10}
          textAlign="left"
          mt={width && width > 560 ? 28 : 20}
        >
          <Trans i18nKey="consent:paragraph3">
            By checking the below boxes, you are granting your explicit, freely given, and informed consent to Virufy to
            collect, process, and share your information for the purposes indicated above and as provided in greater
            detail in our <Link to={privacyPolicy[currentCountry]} target="_blank">Privacy Policy</Link>. You can print
            a copy of this Consent Form for your personal records by
            accessing <Link to={consentPdf[currentCountry]} target="_blank">Privacy Policy</Link>
          </Trans>
        </WelcomeSubtitle>

        {store?.country === 'Brazil' && (
          <WelcomeSubtitle fontWeight={400} mb={p3MarginBottom} textAlign="left">
            <Trans i18nKey="consent:paragraph3_brazil">
              If you are located inside Brazilian national territory, and for the purposes of the General Personal Data
              Protection Law (&quot;LGPD&quot;), &quot;consent&quot;, in its free, informed, and unequivocal
              pronouncement, will be the legal basis on which we process sensitive personal data.
            </Trans>
          </WelcomeSubtitle>
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
              label={t('consent:certify')}
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
                <Trans i18nKey="consent:agree">
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

        {currentCountry !== 'Colombia' && (
          <>
            <Controller
              control={control}
              name="agreedCovidDetection"
              defaultValue={false}
              render={({ onChange, value, name }) => (
                <Checkbox
                  id="Step2-DetectionCovid"
                  label={(
                    <Trans i18nKey="consent:detection">
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

            <Controller
              control={control}
              name="agreedTrainingArtificial"
              defaultValue={false}
              render={({ onChange, value, name }) => (
                <Checkbox
                  id="Step2-TrainingArtificial"
                  label={(
                    <Trans i18nKey="consent:signs">
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
          </>
        )}

        <Controller
          control={control}
          name="agreeCollectionAndProcessingInfo"
          defaultValue={false}
          render={({ onChange, value, name }) => (
            <Checkbox
              id="Step2-CollectionNProcessing"
              label={(
                <Trans i18nKey="consent:collection">
                  I hereby expressly consent to the collection and processing of my personal information, biometric
                  information, and health data.
                </Trans>
              )}
              name={name}
              onChange={e => onChange(e.target.checked)}
              value={value}
            />
          )}
        />

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

export default React.memo(Step3);
