import styled, { css } from 'styled-components';
import { colors } from 'theme';

export const BaseText = css`
  font-family: 'Source Sans Pro';
  font-size: 0.875rem;
  line-height: 20px;
`;

export const BlackText = styled.div<{ dark?: boolean; fontSize?: string; }>`
  ${BaseText}
  color: ${({ dark }) => (dark ? colors.darkBlack : colors.black)};
  ${props => (props.fontSize ? `font-size: ${props.fontSize};` : '')}
`;

export const BaseTitle = styled.div`
  font-family: 'Open Sans';
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 34.24px;
  color: ${colors.darkBlack};
`;
