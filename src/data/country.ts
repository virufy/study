import { states } from './states/states';

export interface CountryDataProps {
  label: string;
  value: string;
  telephonePrefix: string;
  states: string[];
}

export const countryData: CountryDataProps[] = [
  {
    label: 'Afghanistan', value: 'Afghanistan', telephonePrefix: ' ', states: states.Afghanistan,
  },
  {
    label: 'Albania', value: 'Albania', telephonePrefix: ' ', states: states.Albania,
  },
  {
    label: 'Algeria', value: 'Algeria', telephonePrefix: ' ', states: states.Algeria,
  },
  {
    label: 'Andorra', value: 'Andorra', telephonePrefix: ' ', states: states.Andorra,
  },
  {
    label: 'Angola', value: 'Angola', telephonePrefix: ' ', states: states.Angola,
  },
  {
    label: 'Antigua and barbuda', value: 'Antigua and barbuda', telephonePrefix: ' ', states: states.Antigua,
  },
  {
    label: 'Argentina', value: 'Argentina', telephonePrefix: '+54', states: states.Argentina,
  },
  {
    label: 'Armenia', value: 'Armenia', telephonePrefix: ' ', states: states.Armenia,
  },
  {
    label: 'Australia', value: 'Australia', telephonePrefix: ' ', states: states.Australia,
  },
  {
    label: 'Austria', value: 'Austria', telephonePrefix: ' ', states: states.Austria,
  },
  {
    label: 'Azerbaijan', value: 'Azerbaijan', telephonePrefix: ' ', states: [],
  },
  {
    label: 'Bahamas', value: 'Bahamas', telephonePrefix: ' ', states: states.Bahamas,
  },
  {
    label: 'Bahrain', value: 'Bahrain', telephonePrefix: ' ', states: states.Bahrain,
  },
  {
    label: 'Bangladesh', value: 'Bangladesh', telephonePrefix: ' ', states: states.Bangladesh,
  },
  {
    label: 'Barbados', value: 'Barbados', telephonePrefix: ' ', states: states.Barbados,
  },
  {
    label: 'Belarus', value: 'Belarus', telephonePrefix: ' ', states: states.Belarus,
  },
  {
    label: 'Belgium', value: 'Belgium', telephonePrefix: ' ', states: states.Belgium,
  },
  {
    label: 'Belize', value: 'Belize', telephonePrefix: ' ', states: states.Belize,
  },
  {
    label: 'Benin', value: 'Benin', telephonePrefix: ' ', states: states.Benin,
  },
  {
    label: 'Bhutan', value: 'Bhutan', telephonePrefix: ' ', states: states.Bhutan,
  },
  {
    label: 'Bolivia', value: 'Bolivia', telephonePrefix: '+591', states: states.Bolivia,
  },
  {
    label: 'Bosnia and herzegovina', value: 'Bosnia and herzegovina', telephonePrefix: '', states: states.Bosnia,
  },
  {
    label: 'Botswana', value: 'Botswana', telephonePrefix: '', states: states.Botswana,
  },
  {
    label: 'Brazil', value: 'Brazil', telephonePrefix: '+55', states: states.Brazil,
  },
  {
    label: 'Brunei darussalam', value: 'Brunei darussalam', telephonePrefix: '', states: states.Brunei,
  },
  {
    label: 'Bulgaria', value: 'Bulgaria', telephonePrefix: '', states: states.Bulgaria,
  },
  {
    label: 'Burkina faso', value: 'Burkina faso', telephonePrefix: '', states: states.Burkina,
  },
  {
    label: 'Burundi', value: 'Burundi', telephonePrefix: '', states: states.Burundi,
  },
  {
    label: 'Cabo verde', value: 'Cabo verde', telephonePrefix: '', states: states.Cabo,
  },
  {
    label: 'Cambodia', value: 'Cambodia', telephonePrefix: '', states: states.Cambodia,
  },
  {
    label: 'Cameroon', value: 'Cameroon', telephonePrefix: '', states: states.Cameroon,
  },
  {
    label: 'Canada', value: 'Canada', telephonePrefix: '', states: states.Canada,
  },
  {
    label: 'Central african republic', value: 'Central african republic', telephonePrefix: '', states: states.CentralAfrican,
  },
  {
    label: 'Chad', value: 'Chad', telephonePrefix: '', states: states.Chad,
  },
  {
    label: 'Chile', value: 'Chile', telephonePrefix: '', states: states.Chile,
  },
  {
    label: 'China', value: 'China', telephonePrefix: '', states: states.China,
  },
  {
    label: 'Colombia', value: 'Colombia', telephonePrefix: '+57', states: states.Colombia,
  },
  {
    label: 'Comoros', value: 'Comoros', telephonePrefix: '', states: states.Comoros,
  },
  {
    label: 'Congo', value: 'Congo', telephonePrefix: '', states: states.Congo,
  },
  {
    label: 'Cook islands', value: 'Cook islands', telephonePrefix: '', states: states.Cook,
  },
  {
    label: 'Costa rica', value: 'Costa rica', telephonePrefix: '', states: states.CostaRica,
  },
  {
    label: 'Croatia', value: 'Croatia', telephonePrefix: '', states: states.Croatia,
  },
  {
    label: 'Cuba', value: 'Cuba', telephonePrefix: '', states: states.Cuba,
  },
  {
    label: 'Cyprus', value: 'Cyprus', telephonePrefix: '', states: states.Cyprus,
  },
  {
    label: 'Czechia', value: 'Czechia', telephonePrefix: '', states: states.Czechia,
  },
  {
    label: 'Ivory Coast', value: 'Ivory Coast', telephonePrefix: '', states: states.IvoryCoast,
  },
  // {
  // label: 'Democratic republic of korea', value: 'Democratic republic of korea', telephonePrefix: '',
  // states: states.DemocraticKorea
  // },
  {
    label: 'Democratic republic of the congo', value: 'Democratic republic of the congo', telephonePrefix: '', states: states.Congo,
  },
  {
    label: 'Denmark', value: 'Denmark', telephonePrefix: '', states: states.Denmark,
  },
  {
    label: 'Djibouti', value: 'Djibouti', telephonePrefix: '', states: states.Djibouti,
  },
  {
    label: 'Dominica', value: 'Dominica', telephonePrefix: '', states: states.Dominica,
  },
  {
    label: 'Dominican republic', value: 'Dominican republic', telephonePrefix: '', states: states.DominicanRepublic,
  },
  {
    label: 'Ecuador', value: 'Ecuador', telephonePrefix: '', states: states.Ecuador,
  },
  {
    label: 'Egypt', value: 'Egypt', telephonePrefix: '', states: states.Egypt,
  },
  {
    label: 'El Salvador', value: 'El salvador', telephonePrefix: '', states: states.Salvador,
  },
  {
    label: 'Equatorial guinea', value: 'Equatorial guinea', telephonePrefix: '', states: states.EquatorialGuinea,
  },
  {
    label: 'Eritrea', value: 'Eritrea', telephonePrefix: '', states: states.Eritrea,
  },
  {
    label: 'Estonia', value: 'Estonia', telephonePrefix: '', states: states.Estonia,
  },
  {
    label: 'Ethiopia', value: 'Ethiopia', telephonePrefix: '', states: states.Ethiopia,
  },
  {
    label: 'Faroe islands', value: 'Faroe islands', telephonePrefix: '', states: states.Faroe,
  },
  {
    label: 'Fiji', value: 'Fiji', telephonePrefix: '', states: states.Fiji,
  },
  {
    label: 'Finland', value: 'Finland', telephonePrefix: '', states: states.Finland,
  },
  {
    label: 'France', value: 'France', telephonePrefix: '', states: states.France,
  },
  {
    label: 'Gabon', value: 'Gabon', telephonePrefix: '', states: states.Gabon,
  },
  {
    label: 'Gambia', value: 'Gambia', telephonePrefix: '', states: states.Gambia,
  },
  {
    label: 'Georgia', value: 'Georgia', telephonePrefix: '', states: states.Georgia,
  },
  {
    label: 'Germany', value: 'Germany', telephonePrefix: '', states: states.Germany,
  },
  {
    label: 'Ghana', value: 'Ghana', telephonePrefix: '', states: states.Ghana,
  },
  {
    label: 'Greece', value: 'Greece', telephonePrefix: '', states: states.Greece,
  },
  {
    label: 'Grenada', value: 'Grenada', telephonePrefix: '', states: states.Grenada,
  },
  {
    label: 'Guatemala', value: 'Guatemala', telephonePrefix: '', states: states.Guatemala,
  },
  {
    label: 'Guinea', value: 'Guinea', telephonePrefix: '', states: states.Guinea,
  },
  {
    label: 'Guinea-bissau', value: 'Guinea-bissau', telephonePrefix: '', states: states.GuineaBissau,
  },
  {
    label: 'Guyana', value: 'Guyana', telephonePrefix: '', states: states.Guyana,
  },
  {
    label: 'Haiti', value: 'Haiti', telephonePrefix: '', states: states.Haiti,
  },
  {
    label: 'Honduras', value: 'Honduras', telephonePrefix: '', states: states.Honduras,
  },
  {
    label: 'Hungary', value: 'Hungary', telephonePrefix: '', states: states.Hungary,
  },
  {
    label: 'Iceland', value: 'Iceland', telephonePrefix: '', states: states.Iceland,
  },
  {
    label: 'India', value: 'India', telephonePrefix: '', states: states.India,
  },
  {
    label: 'Indonesia', value: 'Indonesia', telephonePrefix: '', states: states.Indonesia,
  },
  {
    label: 'Iran', value: 'Iran', telephonePrefix: '', states: [],
  },
  {
    label: 'Iraq', value: 'Iraq', telephonePrefix: '', states: [],
  },
  {
    label: 'Ireland', value: 'Ireland', telephonePrefix: '', states: states.Ireland,
  },
  {
    label: 'Israel', value: 'Israel', telephonePrefix: '', states: states.Israel,
  },
  {
    label: 'Italy', value: 'Italy', telephonePrefix: '', states: states.Italy,
  },
  {
    label: 'Jamaica', value: 'Jamaica', telephonePrefix: '', states: states.Jamaica,
  },
  {
    label: 'Japan', value: 'Japan', telephonePrefix: '', states: states.Japan,
  },
  {
    label: 'Jordan', value: 'Jordan', telephonePrefix: '', states: [],
  },
  {
    label: 'Kazakhstan', value: 'Kazakhstan', telephonePrefix: '', states: states.Kazakhstan,
  },
  {
    label: 'Kenya', value: 'Kenya', telephonePrefix: '', states: states.Kenya,
  },
  {
    label: 'Kiribati', value: 'Kiribati', telephonePrefix: '', states: states.Kiribati,
  },
  {
    label: 'Kuwait', value: 'Kuwait', telephonePrefix: '', states: [],
  },
  {
    label: 'Kyrgyzstan', value: 'Kyrgyzstan', telephonePrefix: '', states: states.Kyrgyzstan,
  },
  {
    label: 'Lao democratic republic', value: 'Lao democratic republic', telephonePrefix: '', states: states.Lao,
  },
  {
    label: 'Latvia', value: 'Latvia', telephonePrefix: '', states: [],
  },
  {
    label: 'Lebanon', value: 'Lebanon', telephonePrefix: '', states: states.Lebanon,
  },
  {
    label: 'Lesotho', value: 'Lesotho', telephonePrefix: '', states: states.Lesotho,
  },
  {
    label: 'Liberia', value: 'Liberia', telephonePrefix: '', states: states.Liberia,
  },
  {
    label: 'Libya', value: 'Libya', telephonePrefix: '', states: [],
  },
  {
    label: 'Lithuania', value: 'Lithuania', telephonePrefix: '', states: [],
  },
  {
    label: 'Luxembourg', value: 'Luxembourg', telephonePrefix: '', states: states.Luxembourg,
  },
  {
    label: 'Madagascar', value: 'Madagascar', telephonePrefix: '', states: states.Madagascar,
  },
  {
    label: 'Malawi', value: 'Malawi', telephonePrefix: '', states: states.Malawi,
  },
  {
    label: 'Malaysia', value: 'Malaysia', telephonePrefix: '', states: states.Malaysia,
  },
  {
    label: 'Maldives', value: 'Maldives', telephonePrefix: '', states: states.Maldives,
  },
  {
    label: 'Mali', value: 'Mali', telephonePrefix: '', states: states.Mali,
  },
  {
    label: 'Malta', value: 'Malta', telephonePrefix: '', states: [],
  },
  {
    label: 'Marshall islands', value: 'Marshall islands', telephonePrefix: '', states: states.Marshall,
  },
  {
    label: 'Mauritania', value: 'Mauritania', telephonePrefix: '', states: states.Mauritania,
  },
  {
    label: 'Mauritius', value: 'Mauritius', telephonePrefix: '', states: states.Mauritius,
  },
  {
    label: 'Mexico', value: 'Mexico', telephonePrefix: '+52', states: states.Mexico,
  },
  {
    label: 'Micronesia', value: 'Micronesia', telephonePrefix: '', states: states.Micronesia,
  },
  {
    label: 'Monaco', value: 'Monaco', telephonePrefix: '', states: states.Monaco,
  },
  {
    label: 'Mongolia', value: 'Mongolia', telephonePrefix: '', states: states.Mongolia,
  },
  {
    label: 'Montenegro', value: 'Montenegro', telephonePrefix: '', states: [],
  },
  {
    label: 'Morocco', value: 'Morocco', telephonePrefix: '', states: states.Morocco,
  },
  {
    label: 'Mozambique', value: 'Mozambique', telephonePrefix: '', states: states.Mozambique,
  },
  {
    label: 'Myanmar', value: 'Myanmar', telephonePrefix: '', states: states.Myanmar,
  },
  {
    label: 'Namibia', value: 'Namibia', telephonePrefix: '', states: states.Namibia,
  },
  {
    label: 'Nauru', value: 'Nauru', telephonePrefix: '', states: states.Nauru,
  },
  {
    label: 'Nepal', value: 'Nepal', telephonePrefix: '', states: states.Nepal,
  },
  {
    label: 'Netherlands', value: 'Netherlands', telephonePrefix: '', states: states.Netherlands,
  },
  {
    label: 'New zealand', value: 'New zealand', telephonePrefix: '', states: states.NewZealand,
  },
  {
    label: 'Nicaragua', value: 'Nicaragua', telephonePrefix: '', states: states.Nicaragua,
  },
  {
    label: 'Niger', value: 'Niger', telephonePrefix: '', states: states.Niger,
  },
  {
    label: 'Niigeria', value: 'Nigeria', telephonePrefix: '', states: states.Nigeria,
  },
  {
    label: 'Niue', value: 'Niue', telephonePrefix: '', states: states.Niue,
  },
  {
    label: 'North macedonia', value: 'North macedonia', telephonePrefix: '', states: [],
  },
  {
    label: 'Norway', value: 'Norway', telephonePrefix: '', states: states.Norway,
  },
  {
    label: 'Oman', value: 'Oman', telephonePrefix: '', states: states.Oman,
  },
  // { label: 'Pakistan', value: 'Pakistan', telephonePrefix: '', states: [] },
  {
    label: 'Palau', value: 'Palau', telephonePrefix: '', states: states.Palau,
  },
  {
    label: 'Palestine', value: 'Palestine', telephonePrefix: '', states: [],
  },
  {
    label: 'Panama', value: 'Panama', telephonePrefix: '', states: states.Panama,
  },
  {
    label: 'Papua new guinea', value: 'Papua new guinea', telephonePrefix: '', states: states.Papua,
  },
  {
    label: 'Paraguay', value: 'Paraguay', telephonePrefix: '', states: states.Paraguay,
  },
  {
    label: 'Peru', value: 'Peru', telephonePrefix: '+51', states: states.Peru,
  },
  {
    label: 'Philippines', value: 'Philippines', telephonePrefix: '', states: states.Philippines,
  },
  {
    label: 'Poland', value: 'Poland', telephonePrefix: '', states: [],
  },
  {
    label: 'Portugal', value: 'Portugal', telephonePrefix: '', states: states.Portugal,
  },
  {
    label: 'Qatar', value: 'Qatar', telephonePrefix: '', states: [],
  },
  {
    label: 'Republic of korea', value: 'Republic of korea', telephonePrefix: '', states: states.RepublicKorea,
  },
  {
    label: 'Republic of moldova', value: 'Republic of moldova', telephonePrefix: '', states: [],
  },
  {
    label: 'Romania', value: 'Romania', telephonePrefix: '', states: states.Romania,
  },
  {
    label: 'Russian federation', value: 'Russian federation', telephonePrefix: '', states: states.Russian,
  },
  {
    label: 'Rwanda', value: 'Rwanda', telephonePrefix: '', states: states.Rwanda,
  },
  {
    label: 'Saint kitts and nevis', value: 'Saint kitts and nevis', telephonePrefix: '', states: states.SaintKitts,
  },
  {
    label: 'Saint lucia', value: 'Saint lucia', telephonePrefix: '', states: states.SaintLucia,
  },
  {
    label: 'Saint vincent and the grenadines', value: 'Saint vincent and the grenadines', telephonePrefix: '', states: states.SaintVincent,
  },
  {
    label: 'Samoa', value: 'Samoa', telephonePrefix: '', states: states.Samoa,
  },
  {
    label: 'San marino', value: 'San marino', telephonePrefix: '', states: states.SanMarino,
  },
  {
    label: 'Sao tome and principe', value: 'Sao tome and principe', telephonePrefix: '', states: states.SaoTome,
  },
  {
    label: 'Saudi arabia', value: 'Saudi arabia', telephonePrefix: '', states: states.Saudi,
  },
  {
    label: 'Senegal', value: 'Senegal', telephonePrefix: '', states: states.Senegal,
  },
  {
    label: 'Serbia', value: 'Serbia', telephonePrefix: '', states: [],
  },
  {
    label: 'Switzerland', value: 'Seychelles', telephonePrefix: '', states: states.Seychelles,
  },
  {
    label: 'Sierra leone', value: 'Sierra leone', telephonePrefix: '', states: states.Sierra,
  },
  {
    label: 'Sigapore', value: 'Singapore', telephonePrefix: '', states: states.Singapore,
  },
  {
    label: 'Slovakia', value: 'Slovakia', telephonePrefix: '', states: states.Slovakia,
  },
  {
    label: 'Slovenia', value: 'Slovenia', telephonePrefix: '', states: states.Slovenia,
  },
  {
    label: 'Solomon islands', value: 'Solomon islands', telephonePrefix: '', states: states.Solomon,
  },
  {
    label: 'Soomalia', value: 'Somalia', telephonePrefix: '', states: [],
  },
  {
    label: 'South Africa', value: 'South africa', telephonePrefix: '', states: states.SouthAfrica,
  },
  {
    label: 'South sudan', value: 'South sudan', telephonePrefix: '', states: states.SouthSudan,
  },
  {
    label: 'Spain', value: 'Spain', telephonePrefix: '', states: states.Spain,
  },
  {
    label: 'Sri lanka', value: 'Sri lanka', telephonePrefix: '', states: states.Sri,
  },
  {
    label: 'Sudan', value: 'Sudan', telephonePrefix: '', states: states.Sudan,
  },
  {
    label: 'Suriname', value: 'Suriname', telephonePrefix: '', states: states.Suriname,
  },
  {
    label: 'Sweden', value: 'Sweden', telephonePrefix: '', states: states.Sweden,
  },
  {
    label: 'Switzerland', value: 'Switzerland', telephonePrefix: '', states: states.Switzerland,
  },
  {
    label: 'Syrian arab republic', value: 'Syrian arab republic', telephonePrefix: '', states: states.Syrian,
  },
  {
    label: 'Tajikistan', value: 'Tajikistan', telephonePrefix: '', states: states.Tajikistan,
  },
  {
    label: 'Thailand', value: 'Thailand', telephonePrefix: '', states: states.Thailand,
  },
  {
    label: 'Timor-leste', value: 'Timor-leste', telephonePrefix: '', states: states.Timor,
  },
  {
    label: 'Togo', value: 'Togo', telephonePrefix: '', states: states.Togo,
  },
  {
    label: 'Tokelau', value: 'Tokelau', telephonePrefix: '', states: [],
  },
  {
    label: 'Tonga', value: 'Tonga', telephonePrefix: '', states: states.Tonga,
  },
  {
    label: 'Trinidad and tobago', value: 'Trinidad and tobago', telephonePrefix: '', states: states.Trinidad,
  },
  {
    label: 'Tunisia', value: 'Tunisia', telephonePrefix: '', states: states.Tunisia,
  },
  {
    label: 'Turkey', value: 'Turkey', telephonePrefix: '', states: states.Turkey,
  },
  {
    label: 'Turkmenistan', value: 'Turkmenistan', telephonePrefix: '', states: states.Turkmenistan,
  },
  {
    label: 'Tuvalu', value: 'Tuvalu', telephonePrefix: '', states: states.Tuvalu,
  },
  {
    label: 'Uganda', value: 'Uganda', telephonePrefix: '', states: states.Uganda,
  },
  {
    label: 'Ukraine', value: 'Ukraine', telephonePrefix: '', states: states.Ukraine,
  },
  {
    label: 'United arab emirates', value: 'United arab emirates', telephonePrefix: '', states: states.UnitedArab,
  },
  {
    label: 'United kingdom', value: 'United kingdom', telephonePrefix: '', states: states.UnitedKingdom,
  },
  {
    label: 'United republic of tanzania', value: 'United republic of tanzania', telephonePrefix: '', states: states.Tanzania,
  },
  {
    label: 'United States', value: 'United States', telephonePrefix: '+51', states: states.UnitedStates,
  },
  {
    label: 'Uruguay', value: 'Uruguay', telephonePrefix: '', states: states.Uruguay,
  },
  {
    label: 'Uzbekistan', value: 'Uzbekistan', telephonePrefix: '', states: states.Uzbekistan,
  },
  {
    label: 'Vanuatu', value: 'Vanuatu', telephonePrefix: '', states: states.Vanuatu,
  },
  {
    label: 'Venezuela', value: 'Venezuela', telephonePrefix: '', states: states.Venezuela,
  },
  {
    label: 'Vietnam', value: 'Vietnam', telephonePrefix: '', states: [],
  },
  {
    label: 'Yemen', value: 'Yemen', telephonePrefix: '', states: [],
  },
  {
    label: 'Zambia', value: 'Zambia', telephonePrefix: '', states: states.Zambia,
  },
  {
    label: 'ZiZimbabwe', value: 'Zimbabwe', telephonePrefix: '', states: states.Zimbabwe,
  },

];

export const countriesWithStates: string[] = countryData.filter(c => c.states.length > 0).map(c => c.value);
