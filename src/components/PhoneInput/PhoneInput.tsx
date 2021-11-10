import React from 'react';

// Data
import { countryData, CountryDataProps } from 'data/country';

// Styles
import { PhoneInputStyled, TelephonePrefix, PhoneContainer } from './style';

export interface PhoneInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  country: string;
  placeholder?: string;
}

const getTelephonePrefix = (country: string) => countryData.find((element: CountryDataProps) => element.value === country)?.telephonePrefix || '';

const PhoneInput = React.memo(({
  id, value, onChange, country, placeholder,
}: PhoneInputProps) => {
  // Memos
  const invalidKeys: string[] = React.useMemo(() => ['.', 'e', 'E'], []);

  // Handlers
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (invalidKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <PhoneContainer>
      <PhoneInputStyled
        id={id}
        type="number"
        autoComplete="Off"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        value={value}
      />
      <TelephonePrefix>
        {getTelephonePrefix(country)}
      </TelephonePrefix>
    </PhoneContainer>
  );
});

export default PhoneInput;
