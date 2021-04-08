import styled from 'styled-components';
import { colors } from 'theme';
import { BlackText } from 'components/Texts';

export const MainContainer = styled.div``;

export const InstructionTitle = styled.div`
  width: 100%;
  height: 29px;

  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 160%;

  text-align: center;
  margin-bottom: 16px;

  color: ${props => props.theme.colors.darkBlack};
`;

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
