import styled, { css } from 'styled-components';
import { ReactComponent as Logo } from 'assets/virufyLogo.svg';
import { ReactComponent as WomanWithPhoneFrontSvg } from 'assets/images/womanWithPhoneFront.svg';

interface WelcomeTitleProps {
  fontSize?: number;
  mt?: number;
  mb?: number;
  textAlign?: 'center' | 'left';
}

interface WelcomeSubtitleProps {
  fontColor?: string;
  mt?: number,
  mb?: number;
  fontWeight?: number;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: string;
}

interface WelcomeNoteProps {
  isBold?: boolean;
}

export const WelcomeLogo = styled(Logo)`
  display: none; 

  @media screen and (${props => props.theme.breakpoints.tablet}){
    display: block;
    margin: 0 auto;

    width: 112px;
    height: 60px;
  }
`;

export const WelcomeLogoText = styled.div`
  font-family: 'Source Sans Pro'; /* It could be removed if default on body changes */
  font-size: 0.75rem;
  line-height: 1.67;
  text-align: center;
  color: ${props => props.theme.colors.realBlack};
`;

export const WelcomeTitle = styled.h1<WelcomeTitleProps>`
  color: ${props => props.theme.colors.darkBlack};
  font-family: "Open Sans";
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '1.5rem')} ;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${({ mt }) => `${mt || 11}px`};
  margin-bottom: ${({ mb }) => `${mb || 16}px`};
  max-width: 320px;
  text-align: ${({ textAlign }) => textAlign || 'center'};

  @media screen and (${props => props.theme.breakpoints.tablet}){
    font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '2.25rem')} ;
    margin: 50px auto 30px auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: ${({ mt }) => `${mt || 50}px`};
    margin-bottom: ${({ mb }) => `${mb || 30}px`};
    max-width: initial;
  }
`;

export const WelcomeContent = styled.div<{ maxWidth?: number; mt?: number; }>`
  margin: ${({ mt = 30 }) => mt}px auto 0px;
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;
  ${({ maxWidth }) => maxWidth !== undefined && css`max-width: ${maxWidth}px;`}

  @media screen and (${props => props.theme.breakpoints.tablet}){
    text-align: center;
  };
`;

export const WelcomeItemList = styled.ul`
  color: ${props => props.theme.colors.ultraDarkBlack};
  display: flex;
  flex-direction: column;
  font-family: "Source Sans Pro";
  font-size: 0.875rem; 
  font-weight: 400;
  line-height: 1.25rem;
  list-style: none;
  margin: 11px auto 0px;
  max-width: 290px;
  padding: 0;

  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin: auto;
    font-size: 1rem;
    max-width: 347px;
  };
`;

export const WelcomeItemListItem = styled.li`
  padding: 0;
  text-align: left;
  text-indent: -12px;


  &:before {
    background-color: ${props => props.theme.colors.darkBlack};
    border-radius: 50%;
    content: '';
    display: inline-block;
    margin-right: 8px;
    position: relative;
    top: -2.5px;

    height: 4px;
    width: 4px;
  }

  &:not(:first-of-type){
      margin-top: 1.25rem;
    }
`;

export const WelcomeSubtitle = styled.h2<WelcomeSubtitleProps>`
  color: ${({ theme, fontColor }) => (fontColor || theme.colors.ultraDarkBlack)};
  font-family: "Source Sans Pro";
  ${({ fontSize = 14 }) => css`font-size: ${fontSize}px;`}
  ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight}px;`}
  ${({ textAlign }) => textAlign && css`text-align: ${textAlign || 'left'};`}
  font-weight: ${props => props.fontWeight};
  margin-bottom: ${({ mb }) => `${mb}px`};
  margin-left: auto;
  margin-right: auto;
  ${({ mt }) => mt !== undefined && css`margin-top: ${mt}px;`}
  white-space: pre-wrap;

  max-width: 320px;
  width: 100%;
  
  > p {
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }

  @media screen and (${props => props.theme.breakpoints.tablet}){
    font-size: 1rem;
    max-width: 470px;
  }
`;

export const WelcomeSubtitleBold = styled(WelcomeSubtitle).attrs({
  as: 'span',
})`
  font-weight: 700;
`;

export const WelcomeStyledForm = styled.form<{ mt?: string;}>`
  ${({ mt }) => mt && css`margin-top: ${mt};`}
  @media screen and (${props => props.theme.breakpoints.tablet}){
    padding-top: 102px;
  }
`;

export const WelcomeStyledFormAlternative = styled.form`
    @media screen and (${props => props.theme.breakpoints.tablet}){
      padding-top: 32px;
      padding-bottom: 24px;
    }
`;

export const WelcomeInput = styled.input`
  background-color: ${props => props.theme.colors.lightGray};;
  border-radius: 4px;
  border: 0;
  border-radius: 4px;
  color: ${props => props.theme.colors.darkBlack};
  font-family: 'Source Sans Pro';
  margin: auto;
  padding: 12px 15px;

  height: 48px;
  width: 100%;

  ::placeholder {
    color: #A3A3A3;
  }

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 348px;
    }
`;

export const WelcomeRequiredFieldText = styled.span`
  color: ${props => props.theme.colors.red};
`;

export const WelcomeConsentForm = styled.div`
    max-width: 320px;
    margin: 10px auto 20px auto;

    @media screen and (${props => props.theme.breakpoints.tablet}){
      margin: 24px auto 28 auto;
      max-width: 470px;
    }
`;

export const WomanWithPhoneFront = styled(WomanWithPhoneFrontSvg)`
  margin: 29px auto 0px;
  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin: -20px auto 14px;
  }
`;

export const WelcomeNote = styled.span<WelcomeNoteProps>`
  font-family: "Source Sans Pro";
  font-size: 0.75rem;
  line-height: 1.42;
  font-style: italic;
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
  max-width: 320px;
  margin: 52px auto 30px;
`;

export const WelcomeJumpToBottomContainer = styled.div`
    max-width: 470px;
    width: 100%;
    margin: 25px auto;

    @media screen and (${props => props.theme.breakpoints.tablet}){
      margin: 24px auto 28 auto;
      max-width: 470px;
    }
`;

export const RegionContainer = styled.div`
  margin-top: 8px;
  text-align: center;
`;

export const InstallPwa = styled.button.attrs(() => ({ type: 'button' }))`
  color: ${props => props.theme.colors.green};
  background-color: transparent;
  border: 0;
  font-weight: 700;
  padding: 0;
  margin: auto;
  display: block;
  > svg {
    margin-right: 7px;
  }
`;

export const SupportersTitle = styled.div`
  margin-top: 20px;

  color: ${props => props.theme.colors.darkBlack};
  font-family: "Open Sans";
  font-size: 0.875rem;
  line-height: 1.6;
  font-weight: 700;
`;

export const SupportersLogos = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const CheckboxTitle = styled.div`
  font-family: "Source Sans Pro";
  font-size: 0.875rem;
  line-height: 1.42;
  font-weight: bold;
  margin-bottom: 15px;
`;
