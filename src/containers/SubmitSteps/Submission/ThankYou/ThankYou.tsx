import React, { useEffect, useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { useStateMachine } from 'little-state-machine';

// Components
import StayInTouch from 'components/StayInTouch';
import SocialIcons from 'components/SocialIcons';
import Link from 'components/LinkGreen';
import CreatedBy from 'components/CreatedBy';

// Utils
import { resetStore } from 'utils/wizard';

// Helper
import { scrollToTop } from 'helper/scrollHelper';
import { getSpeechContext } from 'helper/stepsDefinitions';

// Hooks
import useHeaderContext from 'hooks/useHeaderContext';

import {
  BeforeSubmitText, ThankYouLayout, ThankYouLogo, ThankYouTitle, SubmissionIdBox,
} from './style';

interface ThankYouLocation {
  submissionId: string
}

const ThankYou = (p: Wizard.StepProps) => {
  const { t } = useTranslation();

  const [, setActiveStep] = useState(true);
  const { setDoGoBack, setTitle } = useHeaderContext();
  const { action } = useStateMachine(resetStore());

  const history = useHistory();
  const location = useLocation<ThankYouLocation>();

  const submissionId = location.state?.submissionId;

  React.useEffect(() => {
    action({});
  }, [action]);

  const handleDoBack = useCallback(() => {
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
    setTitle('');
    setDoGoBack(null);
  }, [handleDoBack, setDoGoBack, setTitle]);

  return (
    <ThankYouLayout>
      <Link to="http://www.virufy.org" target="_blank">
        <ThankYouLogo />
      </Link>
      <ThankYouTitle>{t('thankyou:title')}</ThankYouTitle>
      <BeforeSubmitText>{t('thankyou:paragraph1', { context: getSpeechContext() })}</BeforeSubmitText>
      {submissionId && (
        <SubmissionIdBox>
          <Trans i18nKey="thankyou:paragraph2">
            Your unique submission ID:
            <br />
            <strong>{{ submissionId }}</strong>
          </Trans>
        </SubmissionIdBox>
      )}
      <BeforeSubmitText>
        <Trans i18nKey="thankyou:paragraph3">
          Make sure to safeguard this submission ID, as you will need it to request Virufy to delete your anonymized
          data in future.
          <br /><br />
          If you later develop symptoms such as cough, fever, or shortness of breath, please come back to resubmit your
          latest cough sounds.
        </Trans>
      </BeforeSubmitText>

      <StayInTouch />

      <SocialIcons />

      <CreatedBy inline={false} color="#00A588" mt="72px" />
    </ThankYouLayout>
  );
};

export default React.memo(ThankYou);
