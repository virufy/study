import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import usePortal from 'react-useportal';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import WizardButtons from 'components/WizardButtons';
import { BlackText } from 'components/Texts';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Assets
import HeaderSplash from 'assets/images/baseLogoSplash.png';

// Styles
import {
  HeaderImageContainer,
  HeaderImage,
  LogoWhiteBG,
  BoldPurpleText,
  WelcomeContent,
  WelcomeBullets,
  BulletIndicator,
  WelcomeStyledFormAlternative,
} from '../style';

const Step2 = (p: Wizard.StepProps) => {
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeStep, setActiveStep] = useState(true);
  const {
    setType, setDoGoBack, setLogoSize, setSubtitle,
  } = useHeaderContext();

  const history = useHistory();

  const handleNext = React.useCallback(() => {
    if (p.nextStep) {
      history.push(p.nextStep);
    }
  }, [history, p.nextStep]);

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
    setLogoSize('regular');
    setSubtitle('About Us');
    setType('secondary');
  }, [doBack, setDoGoBack, setLogoSize, setType, setSubtitle]);

  const { t } = useTranslation();

  return (
    <WelcomeStyledFormAlternative>
      <HeaderImageContainer>
        <HeaderImage
          src={HeaderSplash}
        />
        <LogoWhiteBG />
      </HeaderImageContainer>
      <BoldPurpleText>
        {t('main:paragraph2', 'Covid-19 Cough Data Collection Study')}
      </BoldPurpleText>
      <WelcomeContent maxWidth={335} mt={0}>
        <BlackText>
          <Trans i18nKey="helpVirufy:introParagraph">
            <p>
              Welcome to our study! This should only take you about 5 minutes to complete.
              Before we begin, let’s discuss what we will cover:
            </p>
          </Trans>
        </BlackText>

        <BlackText>
          <WelcomeBullets>
            <BulletIndicator>1</BulletIndicator>
          </WelcomeBullets>
          <Trans i18nKey="helpVirufy:bulletsIntro">
            <strong>Intro:</strong>About us and Safety Reminders
          </Trans>
        </BlackText>
        <BlackText>
          <WelcomeBullets>
            <BulletIndicator>2</BulletIndicator>
          </WelcomeBullets>
          <Trans i18nKey="helpVirufy:bulletCough">
            <strong>Cough Into Phone</strong>
          </Trans>
        </BlackText>
        <BlackText>
          <WelcomeBullets>
            <BulletIndicator>3</BulletIndicator>
          </WelcomeBullets>
          <Trans i18nKey="helpVirufy:bulletQuestions">
            <strong>Quick Health Questions</strong>
          </Trans>
        </BlackText>

        {activeStep && (
          <Portal>
            <WizardButtons
              invert
              leftLabel={t('helpVirufy:nextButton')}
              leftHandler={handleNext}
            />
          </Portal>
        )}
      </WelcomeContent>
    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(Step2);
