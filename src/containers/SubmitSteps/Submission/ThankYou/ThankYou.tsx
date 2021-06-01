import React, { useEffect, useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { useStateMachine } from 'little-state-machine';
import usePortal from 'react-useportal';

// Components
import StayInTouch from 'components/StayInTouch';
import SocialIcons from 'components/SocialIcons';
import CreatedBy from 'components/CreatedBy';
import WizardButtons from 'components/WizardButtons';

// Utils
import { resetStore } from 'utils/wizard';

// Helper
import { scrollToTop } from 'helper/scrollHelper';
import { getPatientId, getSpeechContext } from 'helper/stepsDefinitions';

// Hooks
import useHeaderContext from 'hooks/useHeaderContext';

import {
  BeforeSubmitText, ThankYouLayout, ThankYouTitle, SubmissionIdBox,
} from './style';

interface ThankYouLocation {
  submissionId: string
}

const ThankYou = (p: Wizard.StepProps) => {
  const { t } = useTranslation();

  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });

  const [, setActiveStep] = useState(true);
  const { setDoGoBack, setTitle, setType } = useHeaderContext();
  const { action } = useStateMachine(resetStore());

  const history = useHistory();
  const location = useLocation<ThankYouLocation>();
  const patientId = getPatientId();

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

  const handleBackMain = React.useCallback(() => {
    history.push('/Welcome');
  }, [history]);

  useEffect(() => {
    scrollToTop();
    setTitle('');
    setType('tertiary');
    setDoGoBack(null);
  }, [handleDoBack, setDoGoBack, setTitle, setType]);

  return (
    <ThankYouLayout>
      <ThankYouTitle>{t('thankyou:title')}</ThankYouTitle>
      {!patientId && <BeforeSubmitText>{t('thankyou:paragraph1_cough', { context: getSpeechContext() })}</BeforeSubmitText>}
      {submissionId && (
        <SubmissionIdBox>
          <Trans i18nKey="thankyou:paragraph2">
            Your unique submission ID:
            <br />
            <strong>{{ submissionId }}</strong>
          </Trans>
        </SubmissionIdBox>
      )}
      {!patientId
      && (
        <>
          <BeforeSubmitText>
            <Trans i18nKey="thankyou:paragraph3">
              Make sure to safeguard this submission ID, as you will need it to request Virufy to delete your anonymized
              data in future.
              <br /><br />
              If you later develop symptoms such as cough, fever, or shortness of breath, please come
              back to resubmit your
              latest cough sounds.
            </Trans>
          </BeforeSubmitText>

          <StayInTouch />

          <SocialIcons />

          <CreatedBy inline={false} mt="72px" />
        </>
      )}
      {patientId && (
        <Portal>
          <WizardButtons
            leftLabel={t('thankyou:returnMain')}
            leftHandler={handleBackMain}
            invert
          />
        </Portal>
      )}

    </ThankYouLayout>
  );
};

export default React.memo(ThankYou);
