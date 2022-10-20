import styled from 'styled-components';

interface StyledSelectProps {
  isMobileFullWidth?: boolean;
}

export const StyledSelect = styled.select<StyledSelectProps>`
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='6' viewBox='0 0 12 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.538574 0.838867L6.1155 5.83887L11.6924 0.838867H0.538574Z' fill='%2321242C'/%3E%3C/svg%3E");
  background-color: ${props => props.theme.colors.midGray};
  background-position: 95% 50%;
  background-repeat: no-repeat;
  border: 0;
  border-radius: 15px;
  color: ${props => props.theme.colors.mineShaft};
  font-family: 'Source Sans Pro';
  margin: auto;
  padding: 12px 15px;
  font-size: 14px;
  
  height: 48px;
  max-width: ${({ isMobileFullWidth }) => (isMobileFullWidth ? 'none' : '320px')};
  width: 100%;


  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
  }
`;
