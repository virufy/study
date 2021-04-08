import ArgentinaStates from './states/Argentina';
import BrazilStates from './states/Brazil';
import ColombiaStates from './states/Colombia';
import PeruStates from './states/Peru';
import UsStates from './states/UnitedStates';

export interface CountryDataProps {
  name: string;
  val: string;
  telephonePrefix: string;
  states: string[],
}

export const countryData: CountryDataProps[] = [
  {
    name: 'Argentina', val: 'Argentina', telephonePrefix: '+54', states: ArgentinaStates,
  },
  {
    name: 'Bolivia', val: 'Bolivia', telephonePrefix: '+591', states: [],
  },
  {
    name: 'Brazil', val: 'Brazil', telephonePrefix: '+55', states: BrazilStates,
  },
  {
    name: 'Colombia', val: 'Colombia', telephonePrefix: '+57', states: ColombiaStates,
  },
  {
    name: 'Mexico', val: 'Mexico', telephonePrefix: '+52', states: [],
  },
  {
    name: 'Pakistan', val: 'Pakistan', telephonePrefix: '+92', states: [],
  },
  {
    name: 'Peru', val: 'Peru', telephonePrefix: '+51', states: PeruStates,
  },
  {
    name: 'United States', val: 'United States', telephonePrefix: '+51', states: UsStates,
  },
];

export const countriesWithStates: string[] = countryData.filter(c => c.states.length > 0).map(c => c.val);
