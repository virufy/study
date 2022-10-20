import styled from 'styled-components';
import { colors } from 'theme';
import { BlackText } from 'components/Texts';

import { ReactComponent as SocialDistancingSVG } from 'assets/images/social-distancing.svg';

/* Containers */
export const MainContainer = styled.div``;

export const InstructionContainer = styled.div`
  display: flex; 
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    max-width: 470px;
    margin: auto;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const TopImage = styled.img`
  width: 195px;
  height: 100px;
  margin: 0 auto 38px;
  display: block;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 470px;
    height: 241px;
  }
`;

export const TopImageContainerSpeech = styled.div`
  width: 100%;
  max-width: 353px;
  height: 100%;
  max-height: 153px;
  margin: 0 auto;
  display: block;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 595px;
    height: 240px;
    margin-bottom: 64px;
  }
`;

export const TopImageSpeech = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const BottomImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BottomImageLeft = styled.img`
  width: 45px;
  height: 67px;
  margin-right: 17px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 108px;
    height: 161px;
  }
`;

export const BottomImageRight = styled.img`
  width: 76px;
  height: 100px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 184px;
    height: 240px;
  }
`;

/* Bullets */

export const WelcomeBullets = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.purple_10}; 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
`;

export const BulletIndicator = styled.p`
  color: ${({ theme }) => theme.colors.purple}; 
  font-family: Source Sans Pro;
  font-size: 20px;
  font-weight: bold;
  margin: 0px;
`;

/* Images */

export const SocialDistancing = styled(SocialDistancingSVG)`
  width: 192px;
  height: 96px;
  margin: 30px auto 37px;
  display: block;
  text-align: center;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 205px;
    height: 140px;
  }
`;

export const HoldCelImage = styled.div`
  width: 99px;
  height: 108px;
  margin: 30px auto;
  display: block;

  svg {
    height: 100%;
    width: 100%;
  }
  
  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 126px;
    height: 158px;
  }
`;

/* Text */
export const Text = styled(BlackText).attrs({ dark: true })`
  margin-bottom: 24px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 40px;
    font-size: 16px;
  }
`;

export const TextSpeech = styled(Text)`
  color: ${colors.realBlack};
  text-align: left;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    max-width: 470px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 205px;
    font-size: 16px;
  }
`;
