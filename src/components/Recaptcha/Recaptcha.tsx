import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';

import { RecaptchaContainer } from './style';

const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY || '';

interface RecaptchaProps {
  onChange(token: string | null): void;
}

const Recaptcha = ({ onChange }: RecaptchaProps) => {
  const { i18n } = useTranslation();

  if (!recaptchaKey) return null;

  return (
    <RecaptchaContainer>
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY || ''}
        onChange={onChange}
        hl={i18n.language}
      />
    </RecaptchaContainer>
  );
};

export default Recaptcha;
