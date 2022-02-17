import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';

// Sentry
import * as Sentry from '@sentry/react';

// Style
import { RecaptchaContainer } from './style';

const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY || '';

interface RecaptchaProps {
  onChange(token: string | null): void;
  setRecaptchaAvailable(state: boolean): void;
}

const Recaptcha = ({ onChange, setRecaptchaAvailable }: RecaptchaProps) => {
  const { i18n } = useTranslation();

  if (!recaptchaKey) return null;

  return (
    <RecaptchaContainer>
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY || ''}
        onChange={onChange}
        onErrored={() => { setRecaptchaAvailable(false); Sentry.captureException('Error on ReCAPTCHA'); }}
        hl={i18n.language}
      />
    </RecaptchaContainer>
  );
};

export default Recaptcha;
