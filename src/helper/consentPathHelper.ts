import { mapOfConsentFiles } from 'utils/mapOfConsentFiles';

type Country = keyof typeof mapOfConsentFiles;

export const buildConsentFilePath = (country:Country, lang:string) => {
  const basePath = `${process.env.PUBLIC_URL}/static/consent`;

  /* Check if country and lang combination exists in automatically generated "mapOfConsentFiles".
   If not, find default lang document for the country and return it. */
  const indexOfLang = mapOfConsentFiles[country].consentLang.indexOf(`${lang}.html`);

  if (indexOfLang !== -1) {
    return `${basePath}/${country}/${mapOfConsentFiles[country].consentLang[indexOfLang]}`;
  }

  const indexOfDefaultDoc = mapOfConsentFiles[country as Country].consentLang.indexOf('default.html');

  return `${basePath}/${country}/${mapOfConsentFiles[country].consentLang[indexOfDefaultDoc]}`;
};
