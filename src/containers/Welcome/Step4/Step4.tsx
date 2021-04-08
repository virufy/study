import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';

// Header Control
import { useTranslation } from 'react-i18next';
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import WizardButtons from 'components/WizardButtons';

// Hooks
import useWindowSize from 'hooks/useWindowSize';

// Theme
import { colors } from 'theme';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  WelcomeLogo,
  WelcomeTitle,
  WelcomeContent,
  WelcomeSubtitle,
  WelcomeItemList,
  WelcomeItemListItem,
  WelcomeStyledFormAlternative,
} from '../style';

const defaultAdviseList = [
  'Use your own device to record the cough sample and wear a mask when appropriate.',
  'Disinfect your device and any affected or nearby surfaces after recording your cough.',
  'If you have an underlying condition that increases your risk from coughing, please check with your healthcare provider before participating.',
  'If you have any symptoms or any questions or concerns about your health condition, please contact your healthcare provider.',
  'If you feel your symptoms are getting worse, please contact your local medical emergency services or first responders immediately.',
];

const Step4 = (p: Wizard.StepProps) => {
  const { width } = useWindowSize();
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeStep, setActiveStep] = useState(true);
  const { setDoGoBack, setTitle, title } = useHeaderContext();

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
    // Clear title if needed
    if (title) setTitle('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  useEffect(() => {
    scrollToTop();
    setDoGoBack(() => doBack);
  }, [doBack, setDoGoBack]);

  const { t } = useTranslation();

  const adviseList: string[] = t('beforeStart:advise_list', { returnObjects: true, defaultValue: defaultAdviseList });

  return (
    <WelcomeStyledFormAlternative>
      <WelcomeLogo />

      <WelcomeTitle
        mt={width && width > 560 ? 38 : 36}
        textAlign={width && width > 560 ? 'center' : 'left'}
      >
        {t('beforeStart:title')}
      </WelcomeTitle>

      <WelcomeContent mt={0}>
        <WelcomeSubtitle
          fontWeight={700}
          fontColor={colors.darkBlack}
          mb={width && width > 560 ? 11 : 1}
          mt={width && width > 560 ? -10 : 0}
          textAlign={width && width > 560 ? 'center' : 'left'}
        >
          {t('beforeStart:subtitle')}
        </WelcomeSubtitle>
      </WelcomeContent>

      <WelcomeItemList>
        {adviseList.map((advise, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <WelcomeItemListItem key={`advise_${idx}`}>{advise}</WelcomeItemListItem>
        ))}
      </WelcomeItemList>

      {activeStep && (
        <Portal>
          <WizardButtons
            leftLabel={t('beforeStart:startButton')}
            leftHandler={handleNext}
            invert
          />
        </Portal>
      )}

    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(Step4);
