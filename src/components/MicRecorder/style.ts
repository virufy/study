import styled from 'styled-components';
import { colors } from 'theme';

export const MicRecorderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const MicButtonsContainer = styled.div`
  display:flex;
  justify-content: space-between;
  width: 144px;
  margin: auto;
`;

export const MicButtonWithText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MicNote = styled.p`
  font-size: 14px;
  color: ${colors.lightDarkGray};
  margin-top: 8px;
  margin-bottom: 0px;
`;
export const MicRecorderButton = styled.button<{ disabled?: boolean; opacity?: boolean}>`
  background-color: ${colors.purple};
  width: 56px;
  height: 56px;
  position: relative;
  outline: none !important;
  border: none;
  border-radius: 50%;
  padding: 0;
  transition: background-color 0.25s;
  opacity: ${props => (props.disabled || props.opacity ? '0.5' : '1')};

  @supports not (-webkit-touch-callout: none) {
    /* CSS for other than iOS devices */
    -webkit-tap-highlight-color: transparent;
  }

  &:active {
    background-color: ${colors.purple};
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
    width: 66px;
    height: 66px;
  }
`;

export const MicRecorderImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.25s;
`;

export const MicRecorderStartImage = styled(MicRecorderImage)`
  width: 27px;
  height: 27px;
`;

export const MicRecorderStopImage = styled(MicRecorderImage)`
  width: 15px;
  height: 15px;
`;

export const MicRecorderTimerContainer = styled.div`
  width: 70px;
  height: 41px;
  font-size: 1.25rem;
  color: ${colors.purple};
  font-weight: bold;
  font-family: 'Source Sans Pro';
  border: 1px solid ${colors.purple};
  border-radius: 15px;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  margin-bottom: 28px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    font-size: 1.75rem;
    margin-top: 22px;
  }
`;

export const MicRecorderTimerReleaseTextContainer = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.red};
  font-family: 'Source Sans Pro';
  display: flex; 
  margin-left: 20px;
  margin-top:10px;
`;

export const MicRecorderTextP = styled.p<{ show?: boolean }>`
  visibility: ${props => (props.show ? 'flex' : 'hidden')};
`;
