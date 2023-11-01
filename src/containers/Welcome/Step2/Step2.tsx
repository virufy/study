import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import usePortal from 'react-useportal';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import WizardButtons from 'components/WizardButtons';
import { BlackText, JapanTitle, JapanFooter } from 'components/Texts';

// Utils
import { scrollToTop } from 'helper/scrollHelper';
import { isClinic } from 'helper/basePathHelper';

// Assets
import HeaderSplash from 'assets/images/baseLogoSplash.png';

// Styles
import { getCountry } from 'helper/stepsDefinitions';
import {
  HeaderImageContainer,
  HeaderImage,
  LogoWhiteBG,
  CustomPurpleText,
  WelcomeContent,
  WelcomeBullets,
  BulletIndicator,
  WelcomeStyledFormAlternative,
  SupportedBy,
  NuevaLogo,
  InstructionContainer,
} from '../style';

const Step2 = (p: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const {
    setType, setDoGoBack, setLogoSize, setSubtitle,
  } = useHeaderContext();
  const history = useHistory();

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
      {country && country !== 'Japan' && (
        <CustomPurpleText mb={isClinic ? 5 : 15}>
          {t('main:paragraph2', 'Covid-19 Cough Data Collection Study')}
        </CustomPurpleText>
      ) }
      {isClinic && (
        <SupportedBy>
          {t('main:supportedBy', 'Supported by')}
          <NuevaLogo />
        </SupportedBy>
      )}

      <WelcomeContent maxWidth={470} mt={0}>
        <BlackText>
          <Trans i18nKey="helpVirufy:introParagraph">
            <p>
              Welcome to our study! This should only take you about 5 minutes to complete.
              Before we begin, let’s discuss what we will cover:
            </p>
          </Trans>
        </BlackText>

        {country && country === 'Japan' && (
          <>
            <JapanTitle className="">
              {t('helpVirufy:introParagraphJapanTitle')}
            </JapanTitle>
            <BlackText>
              <Trans i18nKey="helpVirufy:introParagraphJapanDesc">
                <p>
                  {t('helpVirufy:introParagraphJapanDesc')}
                </p>
              </Trans>
            </BlackText>
            <JapanFooter>
              <Trans i18nKey="helpVirufy:introParagraphJapanFooter">
                <p>
                  {t('helpVirufy:introParagraphJapanFooter')}
                </p>
              </Trans>
            </JapanFooter>
          </>
        )}
        {country && country !== 'Japan' && (
          <>
            <InstructionContainer>
              <WelcomeBullets>
                <BulletIndicator>1</BulletIndicator>
              </WelcomeBullets>
              <BlackText>
                <Trans i18nKey="helpVirufy:bulletsIntro">
                  <strong>Intro: </strong>About us and Safety Reminders
                </Trans>
              </BlackText>
            </InstructionContainer>

            <InstructionContainer>
              <WelcomeBullets>
                <BulletIndicator>2</BulletIndicator>
              </WelcomeBullets>
              <BlackText>
                <Trans i18nKey="helpVirufy:bulletCough">
                  <strong>Cough Into Phone</strong>
                </Trans>
              </BlackText>
            </InstructionContainer>

            <InstructionContainer>
              <WelcomeBullets>
                <BulletIndicator>3</BulletIndicator>
              </WelcomeBullets>
              <BlackText>
                <Trans i18nKey="helpVirufy:bulletQuestions">
                  <strong>Quick Health Questions</strong>
                </Trans>
              </BlackText>
            </InstructionContainer>
          </>
        )}
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
