import styled from 'styled-components';

import { ReactComponent as ArrowftSvg } from 'assets/icons/arrowLeft.svg';
import { ReactComponent as LogoSvg } from 'assets/virufyLogo.svg';

export const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  padding-top: 1rem;
  position:relative;

  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    padding-top: 54px;
  }
`;

export const Title = styled.h1`
  font-family: "Open Sans";
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.25rem;
  padding-top: 8px;
  margin: 0 auto;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    padding-top: 0;
    margin-top: -2px;
  }
`;

export const ArrowLefContainer = styled.div`
  cursor: pointer;
  padding: 10px 15px;
  position: absolute;
  top: 12px;
  margin-left: -15px;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    top: 42px;
    margin-left: -8px;
    > svg {
      width: 13.62px;
      height: 23.1px;
    }
  }
`;

export const ArrowLeft = styled(ArrowftSvg)`
  fill: ${props => props.theme.colors.darkBlack};
`;

export type LogoSize = 'regular' | 'big';

export const Logo = styled(LogoSvg)<{ size?: LogoSize }>`
  margin: 0 auto;
  width: ${({ size }) => {
    switch (size) {
      case 'big':
        return '110px';
      case 'regular':
      default:
        return '75px';
    }
  }};


  @media screen and (${props => props.theme.breakpoints.tablet}){
    display: none;
    }
`;
