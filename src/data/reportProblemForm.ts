export const reportProblemForm = {
  en: 'https://docs.google.com/forms/d/e/1FAIpQLSef77IOT4oxllZABL7aJlTGp6e6Q2_jPoDuIruiDxnU5Wvtxw/viewform',
  ja: 'https://docs.google.com/forms/d/1d2RQaIM5T5X-iqilE16usLshoKGbJNDEUIf0ZwrIQoY/viewform',
  tr: 'https://docs.google.com/forms/d/e/1FAIpQLSef77IOT4oxllZABL7aJlTGp6e6Q2_jPoDuIruiDxnU5Wvtxw/viewform',
  es: 'https://docs.google.com/forms/d/e/1FAIpQLScQL20FOhQbTt7lxWC3FxeynFZ4l7YmGBJJNjJdGkWuhr0dLA/viewform',
  pt: 'https://docs.google.com/forms/d/e/1FAIpQLSemk0bvHaE0IAaHNCxZjWHUBh8bALpqAoigLgLOC1VJZTQLQg/viewform',
};

declare global {
  type ReportProblemLanguage = keyof typeof reportProblemForm;
}
