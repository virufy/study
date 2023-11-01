import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import usePortal from 'react-useportal';
import { isMobile } from 'react-device-detect';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import WizardButtons from 'components/WizardButtons';
import { BlackText } from 'components/Texts';

// Utils
import { scrollToTop } from 'helper/scrollHelper';
import { getCountry } from 'helper/stepsDefinitions';

// Styles
import {
  ContainerShapeDown,
  InnerContainerShapeDown,
  WelcomeContent,
  WelcomeStyledFormAlternative,
  AboutUsSVG,
  BoldBlackText,
} from '../style';

const Step3 = (p: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const history = useHistory();
  const {
    setType, setDoGoBack, setLogoSize, setSubtitle,
  } = useHeaderContext();
  const { t } = useTranslation();

  // States
  const [activeStep, setActiveStep] = useState(true);

  const country = getCountry();

  // Callbacks
  const handleNext = React.useCallback(() => {
    if (p.nextStep) {
      history.push(p.nextStep);
    }
  }, [history, p.nextStep]);

  const doBack = useCallback(() => {
    setType('none');
    if (p.previousStep) {
      setActiveStep(false);
      history.push(p.previousStep);
    } else {
      history.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effects
  useEffect(() => {
    scrollToTop();
    setDoGoBack(() => doBack);
    setLogoSize('regular');
    setSubtitle(t('helpVirufy:title'));
    setType('secondary');
  }, [doBack, setDoGoBack, setLogoSize, setType, setSubtitle, t]);

  return (
    <WelcomeStyledFormAlternative>
      <ContainerShapeDown isMobile={isMobile}>
        <InnerContainerShapeDown>
          <AboutUsSVG />
        </InnerContainerShapeDown>
      </ContainerShapeDown>
      <WelcomeContent maxWidth={470} mt={0}>
        <BlackText mt={0} textCenter>
          <Trans i18nKey="helpVirufy:aboutBeforeText">
            <p>
              {/* eslint-disable-next-line max-len */}
              Before we begin, please tell us a little about us and the content of our research. I will explain it in about 5 minutes.
            </p>
          </Trans>
        </BlackText>
        <BoldBlackText mb={0}>
          {t('helpVirufy:aboutTitle', 'Organization overview')}
        </BoldBlackText>
        <BlackText mt={0}>
          <Trans i18nKey="helpVirufy:aboutParagraph">
            <p>
              {/* eslint-disable-next-line max-len */}
              Virufy, a non-profit organization that develops an artificial intelligence (AI) app that can determine whether cough sounds are similar to those of patients suffering from COVID-19 and seasonal influenza, is We are conducting clinical research to collect cough sounds (audio collection for AI learning) in preparation for the launch of the app in Japan. <br /><br />
              {/* eslint-disable-next-line max-len */}
              Virufy is a California nonprofit organization recognized as a tax-exempt public benefit corporation under Section 501(c)(3) of the Internal Revenue Code. We were established in March 2020 as a project of Stanford University&apos;s COVID-19 Innovation Response Lab, and have been active globally, including in Japan. With the help of leading researchers and experts from around the world and more than 50 organizations including medical institutions, law firms, technology companies, university groups, and global NGOs, we have collected over 400,000 cough audio records. We collect samples and develop AI apps based on algorithms we independently built using machine learning.
            </p>
          </Trans>
        </BlackText>
      </WelcomeContent>

      {activeStep && (
        <Portal>
          <WizardButtons
            invert
            leftLabel={country === 'Japan' ? t('helpVirufy:followingPage') : t('helpVirufy:nextButton')}
            leftHandler={handleNext}
          />
        </Portal>
      )}

    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(Step3);
