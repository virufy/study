import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

// Components
import Link from 'components/Link';

// Data
import { reportProblemForm } from 'data/reportProblemForm';

// Styles
import { FooterContainer } from './style';

interface FooterReportProblemsProps {
}

const FooterReportProblems = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const lang = i18n.language;

  if (location.pathname === '/welcome') return null;

  return (
    <FooterContainer>
      {lang && (
        <Link to={reportProblemForm[lang as FeedbackLanguage]} target="_blank">
          { t('footerReportProblems:message')}
        </Link>
      )}
    </FooterContainer>
  );
};

export default React.memo(FooterReportProblems);
