import styled from 'styled-components';
import { colors } from 'theme';

export const MicRecorderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const MicRecorderButton = styled.button`
  background-color: ${colors.lightGray};
  width: 180px;
  height: 180px;
  position: relative;
  outline: none !important;
  border: none;
  border-radius: 50%;
  padding: 0;
  transition: background-color 0.25s;

  @supports not (-webkit-touch-callout: none) {
    /* CSS for other than iOS devices */
    -webkit-tap-highlight-color: transparent;
  }

  &:active {
    background-color: ${colors.midDarkGray};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    z-index: 1;
    border-radius: 50%;
  }

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 275px;
    height: 275px;
  }
`;

export const MicRecorderImage = styled.img<{ show?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${props => (props.show ? '1' : '0')};
  transition: opacity 0.25s;
`;

export const MicRecorderStartImage = styled(MicRecorderImage)`
  width: 51.33px;
  height: 69.67px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 78.43px;
    height: 106.44px;
  }
`;

export const MicRecorderStopImage = styled(MicRecorderImage)`
  width: 44px;
  height: 51.33px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 53px;
    height: 61.83px;
  }
`;

export const MicRecorderTimerContainer = styled.div`
  font-size: 1.25rem;
  line-height: 28px;
  color: ${colors.realBlack};
  margin-top: 20px;
  font-family: 'Source Sans Pro';

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    font-size: 1.75rem;
    line-height: 40px;
    margin-top: 22px;
  }
`;

export const MicRecorderTimerReleaseTextContainer = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.red};
  font-family: 'Source Sans Pro';
  display: flex;
`;

export const MicRecorderTextP = styled.p<{ show?: boolean }>`
  visibility: ${props => (props.show ? 'flex' : 'hidden')};
`;
