/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { colors } from 'theme';

/* Containers */
export const MainContainer = styled.div`
  margin-bottom: 77px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    max-width: 470px;
    margin: auto;
  }
`;

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 20px 0px 20px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    max-width: 592px;
    margin: 0 auto;
  }
`;

export const PlayerContainerTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

export const PlayerPlayContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 76px;
`;

export const PlayerCrossContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 22px;
  padding-bottom: 22px;
  margin-right: -20px;
  padding-right: 20px;
  box-sizing: content-box;
  cursor: pointer;
`;

export const PlayerContainerBottom = styled.div``;

export const PlayerTopMiddle = styled.div`
  flex: 1;
`;

export const PlayerBottomTop = styled.div`
  position: relative;
  margin-bottom: 4px;
`;

export const PlayerBottomTrack = styled.div<{ progress?: number; playing?: boolean }>`
  position: relative;
  width: 100%;
  height: 4px;
  background-color: ${colors.purple_10};

  &:after{
    content: '';
    position: absolute; 
    left: 0;
    height: 4px;
    background-color: ${colors.purple};
    width: ${props => (props.progress ? `${props.progress}%` : '0%')};
    ${props => (props.playing ? 'transition: width 0.2s linear;' : '')}

  }
`;

export const PlayerBottomThumb = styled.div<{ progress?: number; playing?: boolean }>`
  position: absolute;
  top: -6px;
  left: ${props => (props.progress ? `${props.progress}%` : '0px')};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${colors.purple};
  transform: translateX(-50%);
  ${props => (props.playing ? 'transition: left 0.2s linear;' : '')}
`;

export const PlayerBottomBottom = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

/* Text */

export const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.mineShaft};
  font-size: 18px;
  font-family: "Source Sans Pro";
  text-align: left;
  white-space: pre-wrap;
  width: 100%;
  margin-left: 20px;
  margin-bottom: 60px;
  
  @media screen and (${props => props.theme.breakpoints.tablet}) {
    max-width: 592px;
    margin-right: auto; 
    margin-left: auto; 
  }
`;

export const TitleAudioName = styled.p`
  color: ${({ theme }) => theme.colors.mineShaft};
  font-size: 14px;
  font-family: "Source Sans Pro";
  text-align: left;
`;

export const PlayerTimeIndicator = styled.p`
  opacity: 0.5;
  margin-top: 8px;
  font-family: 'Source Sans Pro';
  font-size: 0.875rem;
  color: ${colors.mineShaft};
  font-weight: 400;
`;

/* Buttons */

export const PlayerPlayButton = styled.div`
  width: 108px;
  height: 108px;
  background-color: ${colors.purple_10};
  border-radius: 50%;
  cursor: pointer;
  display: flex; 
  align-items: center; 
  justify-content: center; 
`;

/* Images */

export const PlayerPlay = styled.img`
  width: 33px;
  height: 40px;
`;

export const PlayerCross = styled.img`
  width: 14px;
  height: 14px;
`;

export const BeforeSubmitText = styled.p`
  font-family: 'Source Sans Pro';
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.theme.colors.darkGray_70};
  margin: 0;
`;

export const TempBeforeSubmitError = styled(BeforeSubmitText)`
color: ${props => props.theme.colors.red};
  text-align: center;
  margin-bottom: 16px;
`;
