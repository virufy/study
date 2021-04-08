export const privacyPolicy = {
  Argentina: 'https://virufy.org/ar/privacy_policy.pdf',
  Bolivia: 'https://virufy.org/bo/privacy_policy.pdf',
  Brazil: 'https://virufy.org/br/privacy_policy.pdf',
  Colombia: 'https://virufy.org/co/privacy_policy.pdf',
  Peru: 'https://virufy.org/pe/privacy_policy.pdf',
  Mexico: 'https://virufy.org/mx/privacy_policy.pdf',
  Pakistan: 'https://virufy.org/eu/privacy_policy.pdf',
  'United States': 'https://virufy.org/us/privacy_policy.pdf',
};

declare global {
  type PrivacyPolicyCountry = keyof typeof privacyPolicy;
}
