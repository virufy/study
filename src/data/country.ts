import { languageData } from './lang';
import { states } from './states/states';

export interface LangProps {
  value: string;
  label: string;
}
export interface CountryDataProps {
  label: string;
  value: string;
  telephonePrefix: string;
  states: string[];
  defaultLang: LangProps[];
  supportedLang: LangProps[];
}

export const countryData: CountryDataProps[] = [
  {
    label: 'Afghanistan', value: 'Afghanistan', telephonePrefix: ' ', states: states.Afghanistan, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Albania', value: 'Albania', telephonePrefix: ' ', states: states.Albania, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Algeria', value: 'Algeria', telephonePrefix: ' ', states: states.Algeria, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Andorra', value: 'Andorra', telephonePrefix: ' ', states: states.Andorra, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Angola', value: 'Angola', telephonePrefix: ' ', states: states.Angola, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Antigua and barbuda', value: 'Antigua and barbuda', telephonePrefix: ' ', states: states.Antigua, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Argentina', value: 'Argentina', telephonePrefix: '+54', states: states.Argentina, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Armenia', value: 'Armenia', telephonePrefix: ' ', states: states.Armenia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Australia', value: 'Australia', telephonePrefix: ' ', states: states.Australia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Austria', value: 'Austria', telephonePrefix: ' ', states: states.Austria, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Azerbaijan', value: 'Azerbaijan', telephonePrefix: ' ', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Bahamas', value: 'Bahamas', telephonePrefix: ' ', states: states.Bahamas, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Bahrain', value: 'Bahrain', telephonePrefix: ' ', states: states.Bahrain, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Bangladesh', value: 'Bangladesh', telephonePrefix: ' ', states: states.Bangladesh, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Barbados', value: 'Barbados', telephonePrefix: ' ', states: states.Barbados, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Belarus', value: 'Belarus', telephonePrefix: ' ', states: states.Belarus, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Belgium', value: 'Belgium', telephonePrefix: ' ', states: states.Belgium, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Belize', value: 'Belize', telephonePrefix: ' ', states: states.Belize, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Benin', value: 'Benin', telephonePrefix: ' ', states: states.Benin, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Bhutan', value: 'Bhutan', telephonePrefix: ' ', states: states.Bhutan, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Bolivia', value: 'Bolivia', telephonePrefix: '+591', states: states.Bolivia, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Bosnia and herzegovina', value: 'Bosnia and herzegovina', telephonePrefix: '', states: states.Bosnia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Botswana', value: 'Botswana', telephonePrefix: '', states: states.Botswana, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Brazil', value: 'Brazil', telephonePrefix: '+55', states: states.Brazil, defaultLang: [{ value: 'pt', label: 'Português' }], supportedLang: languageData,
  },
  {
    label: 'Brunei darussalam', value: 'Brunei darussalam', telephonePrefix: '', states: states.Brunei, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Bulgaria', value: 'Bulgaria', telephonePrefix: '', states: states.Bulgaria, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Burkina faso', value: 'Burkina faso', telephonePrefix: '', states: states.Burkina, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Burundi', value: 'Burundi', telephonePrefix: '', states: states.Burundi, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Cabo verde', value: 'Cabo verde', telephonePrefix: '', states: states.Cabo, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Cambodia', value: 'Cambodia', telephonePrefix: '', states: states.Cambodia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Cameroon', value: 'Cameroon', telephonePrefix: '', states: states.Cameroon, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Canada', value: 'Canada', telephonePrefix: '', states: states.Canada, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Central african republic', value: 'Central african republic', telephonePrefix: '', states: states.CentralAfrican, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Chad', value: 'Chad', telephonePrefix: '', states: states.Chad, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Chile', value: 'Chile', telephonePrefix: '', states: states.Chile, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'China', value: 'China', telephonePrefix: '', states: states.China, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Colombia', value: 'Colombia', telephonePrefix: '+57', states: [], defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Comoros', value: 'Comoros', telephonePrefix: '', states: states.Comoros, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Congo', value: 'Congo', telephonePrefix: '', states: states.Congo, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Cook islands', value: 'Cook islands', telephonePrefix: '', states: states.Cook, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Costa rica', value: 'Costa rica', telephonePrefix: '', states: states.CostaRica, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Croatia', value: 'Croatia', telephonePrefix: '', states: states.Croatia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Cuba', value: 'Cuba', telephonePrefix: '', states: states.Cuba, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Cyprus', value: 'Cyprus', telephonePrefix: '', states: states.Cyprus, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Czechia', value: 'Czechia', telephonePrefix: '', states: states.Czechia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Ivory Coast', value: 'Ivory Coast', telephonePrefix: '', states: states.IvoryCoast, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  // {
  // label: 'Democratic republic of korea', value: 'Democratic republic of korea', telephonePrefix: '',
  // states: states.DemocraticKorea defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  // },
  {
    label: 'Democratic republic of the congo', value: 'Democratic republic of the congo', telephonePrefix: '', states: states.Congo, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Denmark', value: 'Denmark', telephonePrefix: '', states: states.Denmark, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Djibouti', value: 'Djibouti', telephonePrefix: '', states: states.Djibouti, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Dominica', value: 'Dominica', telephonePrefix: '', states: states.Dominica, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Dominican republic', value: 'Dominican republic', telephonePrefix: '', states: states.DominicanRepublic, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Ecuador', value: 'Ecuador', telephonePrefix: '', states: states.Ecuador, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Egypt', value: 'Egypt', telephonePrefix: '', states: states.Egypt, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'El Salvador', value: 'El salvador', telephonePrefix: '', states: states.Salvador, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Equatorial guinea', value: 'Equatorial guinea', telephonePrefix: '', states: states.EquatorialGuinea, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Eritrea', value: 'Eritrea', telephonePrefix: '', states: states.Eritrea, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Estonia', value: 'Estonia', telephonePrefix: '', states: states.Estonia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Ethiopia', value: 'Ethiopia', telephonePrefix: '', states: states.Ethiopia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Faroe islands', value: 'Faroe islands', telephonePrefix: '', states: states.Faroe, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Fiji', value: 'Fiji', telephonePrefix: '', states: states.Fiji, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Finland', value: 'Finland', telephonePrefix: '', states: states.Finland, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'France', value: 'France', telephonePrefix: '', states: states.France, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Gabon', value: 'Gabon', telephonePrefix: '', states: states.Gabon, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Gambia', value: 'Gambia', telephonePrefix: '', states: states.Gambia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Georgia', value: 'Georgia', telephonePrefix: '', states: states.Georgia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Germany', value: 'Germany', telephonePrefix: '', states: states.Germany, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Ghana', value: 'Ghana', telephonePrefix: '', states: states.Ghana, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Greece', value: 'Greece', telephonePrefix: '', states: states.Greece, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Grenada', value: 'Grenada', telephonePrefix: '', states: states.Grenada, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Guatemala', value: 'Guatemala', telephonePrefix: '', states: states.Guatemala, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Guinea', value: 'Guinea', telephonePrefix: '', states: states.Guinea, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Guinea-bissau', value: 'Guinea-bissau', telephonePrefix: '', states: states.GuineaBissau, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Guyana', value: 'Guyana', telephonePrefix: '', states: states.Guyana, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Haiti', value: 'Haiti', telephonePrefix: '', states: states.Haiti, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Honduras', value: 'Honduras', telephonePrefix: '', states: states.Honduras, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Hungary', value: 'Hungary', telephonePrefix: '', states: states.Hungary, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Iceland', value: 'Iceland', telephonePrefix: '', states: states.Iceland, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'India', value: 'India', telephonePrefix: '', states: states.India, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Indonesia', value: 'Indonesia', telephonePrefix: '', states: states.Indonesia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Iran', value: 'Iran', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Iraq', value: 'Iraq', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Ireland', value: 'Ireland', telephonePrefix: '', states: states.Ireland, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Israel', value: 'Israel', telephonePrefix: '', states: states.Israel, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Italy', value: 'Italy', telephonePrefix: '', states: states.Italy, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Jamaica', value: 'Jamaica', telephonePrefix: '', states: states.Jamaica, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Japan', value: 'Japan', telephonePrefix: '', states: states.Japan, defaultLang: [{ value: 'ja', label: '日本語' }], supportedLang: [{ value: 'ja', label: '日本語' }],
  },
  {
    label: 'Jordan', value: 'Jordan', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Kazakhstan', value: 'Kazakhstan', telephonePrefix: '', states: states.Kazakhstan, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Kenya', value: 'Kenya', telephonePrefix: '', states: states.Kenya, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Kiribati', value: 'Kiribati', telephonePrefix: '', states: states.Kiribati, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Kuwait', value: 'Kuwait', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Kyrgyzstan', value: 'Kyrgyzstan', telephonePrefix: '', states: states.Kyrgyzstan, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Lao democratic republic', value: 'Lao democratic republic', telephonePrefix: '', states: states.Lao, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Latvia', value: 'Latvia', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Lebanon', value: 'Lebanon', telephonePrefix: '', states: states.Lebanon, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Lesotho', value: 'Lesotho', telephonePrefix: '', states: states.Lesotho, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Liberia', value: 'Liberia', telephonePrefix: '', states: states.Liberia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Libya', value: 'Libya', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Lithuania', value: 'Lithuania', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Luxembourg', value: 'Luxembourg', telephonePrefix: '', states: states.Luxembourg, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Madagascar', value: 'Madagascar', telephonePrefix: '', states: states.Madagascar, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Malawi', value: 'Malawi', telephonePrefix: '', states: states.Malawi, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Malaysia', value: 'Malaysia', telephonePrefix: '', states: states.Malaysia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Maldives', value: 'Maldives', telephonePrefix: '', states: states.Maldives, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Mali', value: 'Mali', telephonePrefix: '', states: states.Mali, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Malta', value: 'Malta', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Marshall islands', value: 'Marshall islands', telephonePrefix: '', states: states.Marshall, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Mauritania', value: 'Mauritania', telephonePrefix: '', states: states.Mauritania, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Mauritius', value: 'Mauritius', telephonePrefix: '', states: states.Mauritius, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Mexico', value: 'Mexico', telephonePrefix: '+52', states: states.Mexico, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Micronesia', value: 'Micronesia', telephonePrefix: '', states: states.Micronesia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Monaco', value: 'Monaco', telephonePrefix: '', states: states.Monaco, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Mongolia', value: 'Mongolia', telephonePrefix: '', states: states.Mongolia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Montenegro', value: 'Montenegro', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Morocco', value: 'Morocco', telephonePrefix: '', states: states.Morocco, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Mozambique', value: 'Mozambique', telephonePrefix: '', states: states.Mozambique, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Myanmar', value: 'Myanmar', telephonePrefix: '', states: states.Myanmar, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Namibia', value: 'Namibia', telephonePrefix: '', states: states.Namibia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Nauru', value: 'Nauru', telephonePrefix: '', states: states.Nauru, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Nepal', value: 'Nepal', telephonePrefix: '', states: states.Nepal, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Netherlands', value: 'Netherlands', telephonePrefix: '', states: states.Netherlands, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'New zealand', value: 'New zealand', telephonePrefix: '', states: states.NewZealand, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Nicaragua', value: 'Nicaragua', telephonePrefix: '', states: states.Nicaragua, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Niger', value: 'Niger', telephonePrefix: '', states: states.Niger, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Niigeria', value: 'Nigeria', telephonePrefix: '', states: states.Nigeria, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Niue', value: 'Niue', telephonePrefix: '', states: states.Niue, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'North macedonia', value: 'North macedonia', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Norway', value: 'Norway', telephonePrefix: '', states: states.Norway, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Oman', value: 'Oman', telephonePrefix: '', states: states.Oman, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Pakistan', value: 'Pakistan', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Palau', value: 'Palau', telephonePrefix: '', states: states.Palau, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Palestine', value: 'Palestine', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Panama', value: 'Panama', telephonePrefix: '', states: states.Panama, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Papua new guinea', value: 'Papua new guinea', telephonePrefix: '', states: states.Papua, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Paraguay', value: 'Paraguay', telephonePrefix: '', states: states.Paraguay, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Peru', value: 'Peru', telephonePrefix: '+51', states: states.Peru, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Philippines', value: 'Philippines', telephonePrefix: '', states: states.Philippines, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Poland', value: 'Poland', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Portugal', value: 'Portugal', telephonePrefix: '', states: states.Portugal, defaultLang: [{ value: 'pt', label: 'Português' }], supportedLang: languageData,
  },
  {
    label: 'Qatar', value: 'Qatar', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Republic of korea', value: 'Republic of korea', telephonePrefix: '', states: states.RepublicKorea, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Republic of moldova', value: 'Republic of moldova', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Romania', value: 'Romania', telephonePrefix: '', states: states.Romania, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Russian federation', value: 'Russian federation', telephonePrefix: '', states: states.Russian, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Rwanda', value: 'Rwanda', telephonePrefix: '', states: states.Rwanda, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Saint kitts and nevis', value: 'Saint kitts and nevis', telephonePrefix: '', states: states.SaintKitts, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Saint lucia', value: 'Saint lucia', telephonePrefix: '', states: states.SaintLucia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Saint vincent and the grenadines', value: 'Saint vincent and the grenadines', telephonePrefix: '', states: states.SaintVincent, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Samoa', value: 'Samoa', telephonePrefix: '', states: states.Samoa, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'San marino', value: 'San marino', telephonePrefix: '', states: states.SanMarino, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Sao tome and principe', value: 'Sao tome and principe', telephonePrefix: '', states: states.SaoTome, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Saudi arabia', value: 'Saudi arabia', telephonePrefix: '', states: states.Saudi, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Senegal', value: 'Senegal', telephonePrefix: '', states: states.Senegal, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Serbia', value: 'Serbia', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Switzerland', value: 'Seychelles', telephonePrefix: '', states: states.Seychelles, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Sierra leone', value: 'Sierra leone', telephonePrefix: '', states: states.Sierra, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Sigapore', value: 'Singapore', telephonePrefix: '', states: states.Singapore, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Slovakia', value: 'Slovakia', telephonePrefix: '', states: states.Slovakia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Slovenia', value: 'Slovenia', telephonePrefix: '', states: states.Slovenia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Solomon islands', value: 'Solomon islands', telephonePrefix: '', states: states.Solomon, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Soomalia', value: 'Somalia', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'South Africa', value: 'South africa', telephonePrefix: '', states: states.SouthAfrica, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'South sudan', value: 'South sudan', telephonePrefix: '', states: states.SouthSudan, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Spain', value: 'Spain', telephonePrefix: '', states: states.Spain, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Sri lanka', value: 'Sri lanka', telephonePrefix: '', states: states.Sri, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Sudan', value: 'Sudan', telephonePrefix: '', states: states.Sudan, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Suriname', value: 'Suriname', telephonePrefix: '', states: states.Suriname, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Sweden', value: 'Sweden', telephonePrefix: '', states: states.Sweden, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Switzerland', value: 'Switzerland', telephonePrefix: '', states: states.Switzerland, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Syrian arab republic', value: 'Syrian arab republic', telephonePrefix: '', states: states.Syrian, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Tajikistan', value: 'Tajikistan', telephonePrefix: '', states: states.Tajikistan, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Thailand', value: 'Thailand', telephonePrefix: '', states: states.Thailand, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Timor-leste', value: 'Timor-leste', telephonePrefix: '', states: states.Timor, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Togo', value: 'Togo', telephonePrefix: '', states: states.Togo, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Tokelau', value: 'Tokelau', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Tonga', value: 'Tonga', telephonePrefix: '', states: states.Tonga, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Trinidad and tobago', value: 'Trinidad and tobago', telephonePrefix: '', states: states.Trinidad, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Tunisia', value: 'Tunisia', telephonePrefix: '', states: states.Tunisia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Turkey', value: 'Turkey', telephonePrefix: '', states: states.Turkey, defaultLang: [{ value: 'tr', label: 'Türkçe' }], supportedLang: languageData,
  },
  {
    label: 'Turkmenistan', value: 'Turkmenistan', telephonePrefix: '', states: states.Turkmenistan, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Tuvalu', value: 'Tuvalu', telephonePrefix: '', states: states.Tuvalu, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Uganda', value: 'Uganda', telephonePrefix: '', states: states.Uganda, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Ukraine', value: 'Ukraine', telephonePrefix: '', states: states.Ukraine, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'United arab emirates', value: 'United arab emirates', telephonePrefix: '', states: states.UnitedArab, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'United kingdom', value: 'United kingdom', telephonePrefix: '', states: states.UnitedKingdom, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'United republic of tanzania', value: 'United republic of tanzania', telephonePrefix: '', states: states.Tanzania, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'United States', value: 'United States', telephonePrefix: '+51', states: states.UnitedStates, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Uruguay', value: 'Uruguay', telephonePrefix: '', states: states.Uruguay, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Uzbekistan', value: 'Uzbekistan', telephonePrefix: '', states: states.Uzbekistan, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Vanuatu', value: 'Vanuatu', telephonePrefix: '', states: states.Vanuatu, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Venezuela', value: 'Venezuela', telephonePrefix: '', states: states.Venezuela, defaultLang: [{ value: 'es', label: 'Español' }], supportedLang: languageData,
  },
  {
    label: 'Vietnam', value: 'Vietnam', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Yemen', value: 'Yemen', telephonePrefix: '', states: [], defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Zambia', value: 'Zambia', telephonePrefix: '', states: states.Zambia, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },
  {
    label: 'Zimbabwe', value: 'Zimbabwe', telephonePrefix: '', states: states.Zimbabwe, defaultLang: [{ value: 'en', label: 'English' }], supportedLang: languageData,
  },

];

export const countriesWithStates: string[] = countryData.filter(c => c.states.length > 0).map(c => c.value);
