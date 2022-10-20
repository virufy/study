import styled from 'styled-components';

import { ReactComponent as CloseX } from 'assets/icons/crossPurple.svg';
import { ReactComponent as ArrowftSvg } from 'assets/icons/arrowLeft.svg';

export const HeaderContainer = styled.div<{ type?: string, isMobile?: boolean, hasSubtitle?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 27px;

  width: 100%;

  background-color: ${({ type }) => ((type === 'secondary') ? 'rgba(53, 120, 222, 0.1)' : '#EBF1FC')};
  margin-bottom: ${({ type }) => {
    switch (type) {
      case 'primary':
        return '40px';
      default:
        return '0px';
    }
  }};
  
  ${({ type, hasSubtitle }) => (type === 'primary' && hasSubtitle && `
    border-radius: 0 0 70px 70px;
  `)}

  ${({ type, hasSubtitle }) => (type === 'primary' && !hasSubtitle && `
    border-radius: 0 0 50px 50px;
  `)}

  ${({ type }) => (type === 'tertiary' && `
    background-color: #FFFFFF;
  `)}
`;

export type LogoSize = 'regular' | 'big';

export const LogoImg = styled.img<{ size?: LogoSize }>`
  margin: 0 auto;
  width: ${({ size }) => {
    switch (size) {
      case 'big':
        return '156px';
      case 'regular':
      default:
        return '75px';
    }
  }};
  margin-top: ${({ size }) => {
    switch (size) {
      case 'big':
        return '80px';
      case 'regular':
      default:
        return '0px';
    }
  }};
`;

export const TitleContainer = styled.div`
  display:flex;
  flex-direction: column;
`;

export const ArrowLefContainer = styled.div`
  cursor: pointer;
  padding-bottom: 10px;
  padding-left: 20px;
  position: absolute;
  left: 0px;
  top: 24px;
  > svg {
    width: 13.62px;
    height: 23.1px;
  }
`;

export const ArrowLeft = styled(ArrowftSvg)`
  fill: ${props => props.theme.colors.darkBlack};
`;

export const CloseLeft = styled(CloseX)`
  fill: ${props => props.theme.colors.purple};
`;
