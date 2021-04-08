import styled from 'styled-components';
import { colors } from '../../theme';

export interface StyledButtonProps {
  disabled?: boolean;
  dark?: boolean;
  id?: string;
}

export const StyledButton = styled.button<StyledButtonProps>`
  height: 50px;
  border-radius: 4px; 
  font-family: 'Source Sans Pro'; /* It could be removed if default on body changes */
  font-weight: bold;
  font-size: 14px;
  font-weight: bold;
  width: 100%;

  ${({ dark, disabled }) => {
    const color = disabled ? colors.midGray : colors.darkBlack;
    return dark ? `
    background-color: ${color};
    color: ${colors.white};
    border: none;
  ` : `
    background-color: ${colors.white};
    color: ${color};
    border: 1px solid ${color};
  `;
  }}
`;
