export const privacyPolicy = {
  Argentina: 'https://virufy.org/en/privacy_policy/',
  Bolivia: 'https://virufy.org/en/privacy_policy/',
  Brazil: 'https://virufy.org/en/privacy_policy/',
  Colombia: 'https://virufy.org/en/privacy_policy/',
  Peru: 'https://virufy.org/en/privacy_policy/',
  Mexico: 'https://virufy.org/en/privacy_policy/',
  'United States': 'https://virufy.org/en/privacy_policy/',
  Global: 'https://virufy.org/en/privacy_policy/',
};

declare global {
  type PrivacyPolicyCountry = keyof typeof privacyPolicy;
}
