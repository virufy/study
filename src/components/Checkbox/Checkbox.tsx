/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { FunctionComponent } from 'react';

import { StyledCheckboxContainer, StyledCheckboxInput, StyledCheckboxInputLabel } from './style';

interface CheckboxProps {
  checkboxLeftOffsetPosition?: number;
  fontWeight?: number;
  id: string;
  label: string | React.ReactElement;
  margin?: string;
  name: string;
  onChange: (...event: any[]) => void;
  value: boolean | undefined;
}

const Checkbox: FunctionComponent<CheckboxProps> = ({
  label, id, name, value, fontWeight = 400, margin = 'auto', checkboxLeftOffsetPosition = 20, onChange,
}: CheckboxProps) => (
  <StyledCheckboxContainer isChecked={value} fontWeight={fontWeight} margin={margin}>
    <StyledCheckboxInput
      onChange={onChange}
      checkboxLeftOffsetPosition={checkboxLeftOffsetPosition}
      id={id}
      name={name}
      checked={value}
    />
    <StyledCheckboxInputLabel
      htmlFor={id}
      checkboxLeftOffsetPosition={checkboxLeftOffsetPosition}
    >
      {label}
    </StyledCheckboxInputLabel>
  </StyledCheckboxContainer>
);

export default Checkbox;
