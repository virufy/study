export const consentPdf = {
  Argentina: 'https://virufy.org/ar/study_consent.pdf',
  Bolivia: 'https://virufy.org/bo/study_consent.pdf',
  Brazil: 'https://virufy.org/br/study_consent.pdf',
  Colombia: 'https://virufy.org/co/study_consent.pdf',
  Peru: 'https://virufy.org/pe/study_consent.pdf',
  Mexico: 'https://virufy.org/mx/study_consent.pdf',
  'United States': 'https://virufy.org/us/study_consent.pdf',
};

declare global {
  type ConsentPDFCountry = keyof typeof consentPdf;
}
