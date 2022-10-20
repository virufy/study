import styled, { css } from 'styled-components';
import Select from 'react-select';

import { ReactComponent as ArrowRight } from 'assets/icons/arrowRight.svg';
import { ReactComponent as AboutUs } from 'assets/images/about-us.svg';
import { ReactComponent as LogoSplash } from 'assets/virufyLogoWhiteBox.svg';
import { ReactComponent as NuevaLogoSVG } from 'assets/images/nuevaLogo.svg';
import { ReactComponent as ChevronRightSVG } from 'assets/icons/chevronRight.svg';
import { ReactComponent as checkCircleSVG } from 'assets/icons/checkCircle.svg';

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

/* Welcome General */

export const WelcomeStyledForm = styled.form``;

export const WelcomeStyledFormAlternative = styled.form`
    padding: 0px !important; 
    text-align: center !important;

    @media screen and (${props => props.theme.breakpoints.tablet}){
      margin: auto;
    }
`;

export const WelcomeContent = styled.div<{ maxWidth?: number; mt?: number; }>`
  margin: ${({ mt = 40 }) => mt}px auto 0px;
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;
  ${({ maxWidth }) => maxWidth !== undefined && css`max-width: ${maxWidth}px;`}

  h2 {
    max-width: inherit;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
  }

  @media screen and (${props => props.theme.breakpoints.tablet}){
    text-align: center;
    h2 {
      max-width: 470px;
      padding-left: 0px;
      padding-right: 0px;
    }
  };
`;

export const ContainerShapeDown = styled.div<{ isMobile?: boolean }>`
  width:100%;
  background-color: ${({ theme }) => theme.colors.purple_10};
  padding-top: 55px;

  h2 {
    max-width: inherit;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 0;
  }
`;

export const InnerContainerShapeDown = styled.div`
  width:100%;
  border-radius: 0px 70px 0px 0px;
  background-color: #FFF;
  display: flex;
  justify-content: center;
  padding-top: 37px;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    h2 {
      max-width: 470px;
      margin: auto;
    }
  }
`;

/* Step 1 */
export const LogoSubtitle = styled.div`
  font-family: 'Open Sans';
  font-weight: 200;
  font-size: 12px;
  line-height: 20px;
  color: ${props => props.theme.colors.purple};;
  text-align: center; 
`;

export const WelcomeInput = styled.input`
  background-color: ${props => props.theme.colors.midGray};
  border-radius: 4px;
  border: 0;
  border-radius: 15px;
  color: ${props => props.theme.colors.mineShaft};
  font-family: 'Source Sans Pro';
  margin: auto;
  padding: 12px 15px;

  height: 48px;
  width: 100%;
  max-width: 320px;
  

  ::placeholder {
    color: #A3A3A3;
    font-size: 14px;
  }

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 348px;
    }
`;

export const WelcomeSelect = styled(Select)<{ error?: boolean }>`
    color: ${props => props.theme.colors.mineShaft};
    background-color: ${props => props.theme.colors.midGray};
    font-family: 'Source Sans Pro';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.4;
    width: calc(100% - 40px);
    height: 48px;
    align-items: center;
    border: 2px solid ${props => (props.error ? '#FF0000' : 'transparent')};
    border-radius: 15px;
    margin: 0 20px;
    padding: 12px 15px;
  
    .custom-select__control {
      background-color: transparent;
      border-color: none;
      border-radius: 15px;
      border-style: none; 
      border-width: 0px;
      align-items: center;
      height: 100%;

      :hover {
        border-color: none;
      }
    }
  
    .custom-select__input-container {
      color: ${props => props.theme.colors.mineShaft};
    }

    .custom-select__value-container {
      text-align: left;
      color: ${props => props.theme.colors.mineShaft};
      padding-left: 0;
      padding-top: 0;
      div {
        margin: 0;
      }
  
      .custom-select__placeholder {
        color: ${props => props.theme.colors.mineShaft};
      }

      .custom-select__single-value{
        height: 22px;
        color: ${props => props.theme.colors.mineShaft};
        text-align: left;
      }
    } 
    
    .custom-select__control--is-focused {
      border: none;
    }
  
    .custom-select__indicator {
      padding: 0;
    }
  
    .custom-select__indicator-separator {
      display: none;
    }
  
    .custom-select__control {
      box-shadow: none ;
      min-height: unset;
      &.custom-select__control--is-focused {
        background-color: inherit;
      }
  
    }
  
    .custom-select__dropdown-indicator {
      svg {
        height: 18px;
        width: 19px;
      }
    }
  
    .custom-select__menu {
      width: 100%;
      border-radius: 0;
      border-style: none;
      color: ${props => props.theme.colors.mineShaft};
      margin-left: -15px;
      
      .custom-select__menu-list {
        padding-bottom: 0;
        padding-top: 0;
        max-height: 270px !important;
        
        .custom-select__option {
          padding-left: 15px;
          height: 48px;
          display: flex;
          align-items: center;
          color: ${props => props.theme.colors.mineShaft};
        }
      }
  }
  
  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
    margin: auto;
    width: 100%;
  }
`;

export const TextErrorContainer = styled.div`
  width: 348px;
  margin: 10px auto;

  text-align: left;
  color: #FF0000;

  svg {
    margin-right: 5px;
    fill: #FF0000;
  }
`;

export const RegionContainer = styled.div`
  text-align: center;
`;

export const ContainerNextButton = styled.div`
  width: 100%;
  margin: auto;
  max-width: 335px;
  display:flex;
  justify-content:flex-end;

  @media screen and (${({ theme }) => theme.breakpoints.tablet}){
    max-width: 348px;
    display:flex;
    justify-content: center;
  }
`;

export const NextButton = styled.button<{ isDisable?: boolean;}>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #EBF1FC; 
  opacity: ${({ isDisable }) => (isDisable ? '0.5' : '1')};
  border: 0px;
  margin-bottom: 30px;
  margin-top: 97px;
  margin-right: 10px;
`;

export const ArrowRightSVG = styled(ArrowRight)`
    display: block;
    margin: 0 auto;
    
    width: 32px;
    height: 32px;
`;

export const BoldBlackText = styled.h2`
  font-family: 'Biko';
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.mineShaft}; 
  text-align: left;
  font-weight: 700;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 16px;
  white-space: pre-wrap;

  max-width: 320px;
  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 348px;
  }
`;

export const SupportedBy = styled.p`
  color: #4E92CE;
  font-size: 14px; 
  text-align: center; 
  font-weight: 600; 
`;

export const NuevaLogo = styled(NuevaLogoSVG)`
  width: 49px;
  height: 17px;
  margin-left: 5px;
`;

/* Step 2 */

export const InstructionContainer = styled.div`
  display: flex; 
  width: 100%;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  
  @media screen and (${props => props.theme.breakpoints.tablet}) {
    max-width: 470px;
    margin: auto;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const WelcomeBullets = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.purple_10}; 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const BulletIndicator = styled.p`
  color: ${({ theme }) => theme.colors.purple}; 
  font-size: 20px;
  font-weight: bold;
  margin: 0px;
`;

export const HeaderImageContainer = styled.div`
  position: relative;
  min-width: 375px;
  height: 251px;
  margin-bottom: 30px;

@media screen and (${props => props.theme.breakpoints.tablet}){
  max-width: 768px;
  height: 488px;
}
`;

export const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const LogoWhiteBG = styled(LogoSplash)`
  width: 109px;
  height: 143px;
  margin: auto;
  position: absolute;
  margin-left: -64%;
  top: 26%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    width: 212px;
    height: 280px;
  }
`;

export const CustomPurpleText = styled.h2<{ mb?: number; mt?: number; isLight?: boolean; left?: boolean}>`
  font-family: 'Biko';
  font-size: 24px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.purple}; 
  text-align: ${({ left }) => (left ? 'left' : 'center')};
  font-weight: ${({ isLight }) => (isLight ? '200' : '700')};
  margin: ${({ mt = 32 }) => mt}px auto ${({ mb = 32 }) => mb}px auto;
  white-space: pre-wrap;

  padding-left: 20px;
  padding-right: 20px;
  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
    text-align: center;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

/* Step 3 */

export const AboutUsSVG = styled(AboutUs)`
  margin: -77px auto 30px;
  width: 220px; 
  height: 199px;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin: -87px auto 14px;
    width: 320px; 
    height: 299px;
  }
`;

export const WelcomeNote = styled.span<WelcomeNoteProps>`
  font-family: "Source Sans Pro";
  font-size: 0.75rem;
  line-height: 1.42;
  font-style: italic;
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
  margin: 52px auto 30px;
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    padding-left: 0px;
    padding-right: 0px;
  }
`;

/* Step 4 */

export const CheckboxTitle = styled.div`
  font-family: "Source Sans Pro";
  font-size: 0.875rem;
  line-height: 1.42;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 16px;
  margin-left: 20px;
`;

export const WelcomeConsentForm = styled.div`
  margin: 10px auto 20px auto;
  padding-left: 20px;
  padding-right: 20px;

  .WordSection1 > p,
  .Section1 > p {
    margin-bottom: 0;
    text-align: left !important;
    margin-left: inherit !important;
    text-indent: inherit !important;
  }
  
  span {
    font-family: "Source Sans Pro" !important;
    font-size: 14px !important;
    line-height: 20px !important;
    font-weight: 400 !important;
    color: ${props => props.theme.colors.mineShaft} !important;
    background: transparent !important;
  }

  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin: 24px auto 28px auto;
    max-width: 470px;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

/* Step 5 */

export const WelcomeItemList = styled.ul`
  color: ${props => props.theme.colors.ultraDarkBlack};
  display: flex;
  flex-direction: column;
  font-family: "Source Sans Pro";
  font-size: 0.875rem; 
  font-weight: 400;
  line-height: 1.25rem;
  list-style: none;
  margin: 11px auto 30px;
  padding: 0 32px;

  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin: auto;
    font-size: 1rem;
    max-width: 470px;
    padding: 0 13px;
  };
`;

export const WelcomeItemListItem = styled.li`
  padding: 0;
  text-align: left;
  text-indent: -12px;


  &:before {
    background-color: ${props => props.theme.colors.purple};
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

/* Patient Summary */

export const OptionsContainer = styled.div<{ isFirst?: boolean }>`
  display: flex; 
  flex-direction: column;
  justify-content: center;
  
  width: 100%;
  border-top: ${({ isFirst }) => (isFirst ? '1px solid  #CFCFCF' : '0px')};;
  border-bottom: 1px solid #CFCFCF;
  padding: 0px 20px;

  font-size: 14px; 
  line-height: 20px;
`;

export const OptionsHeader = styled.div<{ isDisabled?: boolean, isButton?: boolean }>`
  display: flex; 
  justify-content: space-between;
  align-items: center;
  height: 60px;
  cursor: ${({ isButton }) => (isButton ? 'pointer' : 'auto')};
  opacity: ${({ isDisabled }) => (isDisabled ? '0.5' : '1')};
`;

export const OptionsBody = styled.div`
  display: flex; 
  flex-direction: column; 
  margin: 20px 0px;
`;

export const OptionsText = styled.p`
    text-align: left;
`;

export const ChevronRight = styled(ChevronRightSVG)`
  width: 6px;
  height: 12.5px;
  margin-right: 5px;
  cursor: pointer;
`;

export const CheckCircle = styled(checkCircleSVG)`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
/**/

export const WelcomeJumpToBottomContainer = styled.div`
    max-width: 470px;
    width: 100%;
    margin: 25px auto;

    @media screen and (${props => props.theme.breakpoints.tablet}){
      margin: 24px auto 28px auto;
      max-width: 470px;
    }
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

/* Supporters */

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
