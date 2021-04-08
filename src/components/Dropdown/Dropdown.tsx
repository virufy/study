/* eslint-disable react/require-default-props */
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { StyledSelect } from './style';

interface DropdownProps extends HTMLAttributes<HTMLSelectElement>{
  children: React.ReactNode;
  isMobileFullWidth?: boolean;
  value: string;
}

const Select:FunctionComponent<DropdownProps> = (props:DropdownProps) => {
  const { children, value, isMobileFullWidth } = props;
  return <StyledSelect {...props} value={value} isMobileFullWidth={isMobileFullWidth}>{children}</StyledSelect>;
};

export default Select;
