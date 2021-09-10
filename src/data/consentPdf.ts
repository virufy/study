export const consentPdf = {
  Argentina: 'https://drive.google.com/file/d/1MtjnS00r4ft0LfPY-IGKdD_f5fB_eXQy/view',
  Bolivia: 'https://virufy.org/bo/study_consent.pdf',
  Brazil: 'https://https://drive.google.com/file/d/1zsvAlX6T-jLLfwp9HmzXwbXSSgpgwHbv/view',
  Colombia: 'https://drive.google.com/file/d/14noGxPVEA2wWI4TxBrMeahIW2scGQgP4/view',
  Greece: 'https://drive.google.com/file/d/1U4rf_pqp58CWJtIOM9FNtdVamIj7Ew6V/view?usp=sharing',
  Peru: 'https://drive.google.com/file/d/1Cq-nDso2fEwMP7dSymne31Vy4Nbdp4IP/view',
  Mexico: 'https://drive.google.com/file/d/168O18PNLzmmiDsg-gNDr4jDVvczd0hq1/view',
  'United States': 'https://drive.google.com/file/d/1aMUv4hp5ypdSXSHIw3-yH1H6aqyTaWh7/view',
  Global: 'https://drive.google.com/file/d/10BWwmUdC2b_8AXDGEIt3P4yrcyLkrhsQ/view?usp=sharing',
};

declare global {
  type ConsentPDFCountry = keyof typeof consentPdf;
}
