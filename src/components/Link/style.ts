import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface LinkProps {
  isBold: boolean;
}

export const StyledInternalLink = styled(Link)<LinkProps>`
  color: ${props => props.theme.colors.darkBlack};
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
  text-decoration: underline;

  &:active, :visited {
    color: ${props => props.theme.colors.darkBlack};
  } 
`;

export const StyledExternalLink = styled.a<LinkProps>`
  color: ${props => props.theme.colors.darkBlack};
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
  text-decoration: underline;

  &:active, :visited {
    color: ${props => props.theme.colors.darkBlack};
  } 
`;
