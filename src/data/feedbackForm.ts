export const feedbackForm = {
  en: 'https://forms.gle/dk3qRqB7dH1E4LFs7',
  es: 'https://forms.gle/VgwrCWLcr9svjZg58',
  pt: 'https://forms.gle/xZG3nLjcibWQG9857',
};

declare global {
  type FeedbackLanguage = keyof typeof feedbackForm;
}
