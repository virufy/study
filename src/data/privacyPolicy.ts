export const privacyPolicy = {
  Argentina: 'https://virufy.org/en/privacy_policy/',
  Bolivia: 'https://virufy.org/en/privacy_policy/',
  Brazil: 'https://virufy.org/en/privacy_policy/',
  Colombia: 'https://virufy.org/en/privacy_policy/',
  Greece: 'https://virufy.org/en/privacy_policy/',
  Peru: 'https://virufy.org/en/privacy_policy/',
  Mexico: 'https://virufy.org/en/privacy_policy/',
  Japan: 'https://virufy.org/ja/privacy_policy/',
  'United States': 'https://virufy.org/en/privacy_policy/',
  Global: 'https://virufy.org/en/privacy_policy/',
};

declare global {
  type PrivacyPolicyCountry = keyof typeof privacyPolicy;
}
