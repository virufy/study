/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { colors } from 'theme';
import { BaseTitle, BlackText } from 'components/Texts';

export const MainContainer = styled.div`
 @media screen and (${props => props.theme.breakpoints.tablet}) {
  margin-bottom: 64px;
 }
`;

export const Title = styled(BaseTitle)`
  margin-top: 48px;
  margin-bottom: 16px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    margin-top: 64px;
    margin-bottom: 40px;
  }
`;

export const Text = styled(BlackText)`
  margin-bottom: 52px;
  color: ${props => props.theme.colors.darkGray_70};

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 85px;
  }
`;

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;

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
  width: 22px;
  padding-bottom: 22px;
  display: flex;
  margin-left: -20px;
  padding-left: 20px;
  box-sizing: content-box;
`;

export const PlayerPlay = styled.img`
  width: 10px;
  height: 16px;
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
`;

export const PlayerCross = styled.img`
  width: 14px;
  height: 14px;
`;

export const PlayerTopMiddle = styled.div`
  flex: 1;
`;

export const PlayerFileName = styled(BlackText).attrs({ dark: true, fontSize: '1rem' })`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: left;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
    line-height: 24px;
  }
`;

export const PlayerFileSize = styled(BlackText).attrs({ dark: true, fontSize: '0.625rem' })`
  text-align: left;
  color: ${props => props.theme.colors.darkGray};

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    font-size: 0.875rem;
    line-height: 24px;
  }
`;

export const PlayerContainerBottom = styled.div``;

export const PlayerBottomTop = styled.div`
  position: relative;
  margin-bottom: 4px;
`;

export const PlayerBottomTrack = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.darkBlack_65};
`;

export const PlayerBottomThumb = styled.div<{ progress?: number; playing?: boolean }>`
  position: absolute;
  top: -2px;
  left: ${props => (props.progress ? `${props.progress}%` : '0px')};
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${colors.darkBlack};
  transform: translateX(-50%);
  ${props => (props.playing ? 'transition: left 0.2s linear;' : '')}
`;

export const PlayerBottomBottom = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const PlayerTimeIndicator = styled(BlackText).attrs({ dark: true, fontSize: '0.625rem' })`
  opacity: 0.6;
  line-height: 1;
`;
