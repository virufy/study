import styled from 'styled-components';
import { ReactComponent as WomanWithPhoneSvg } from 'assets/images/womanWithPhoneSide.svg';
import { colors } from 'theme/index';

/* General */

export const MainContainer = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 0px auto;
`;

export const Title = styled.h1`
  font-family: "Open Sans";
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2.25rem;
  color: ${props => props.theme.colors.darkBlack};

  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin-top: 40px;
  }
`;

export const StepTracker = styled.div<{ progress?: number }>`
  width: 117px;
  height: 8px; 
  margin-right: auto;
  margin-left: auto; 
  margin-bottom: 40px; 
  background-color: ${colors.purple_10};
  border-radius: 10px;
  position: relative; 

  &:after{
    content: '';
    position: absolute; 
    left: 0px;
    height: 8px;
    background-color: ${colors.purple};
    width: ${props => (props.progress ? `${props.progress * 16.8}px` : '0%')};
    border-radius: 10px;
  }
`;

export const WomanWithPhone = styled(WomanWithPhoneSvg)`
  width: 205px;
  height: 156px;
  margin: 40px auto;
  display: block;
`;

export const QuestionAllApply = styled.span`
  color: ${props => props.theme.colors.mineShaft_50};
  font-family: "Source Sans Pro";
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  margin-left: 5px;
`;

export const QuestionText = styled.p<{extraSpace?: boolean; first?: boolean; hasNote?: boolean; rare?: boolean; bold?: boolean; }>`
  font-family: "Source Sans Pro";
  font-size: 1rem;
  line-height: 1.375rem;
  font-weight: ${({ bold }) => ((bold || bold === undefined) ? 700 : 400)};
  margin-top: ${({ first }) => (first ? '0px' : '40px')};
  margin-bottom: ${({ hasNote }) => (hasNote ? '8px' : '36px')};
  color: ${props => props.theme.colors.darkBlack};
`;
export const QuestionNote = styled.span`
  font-family: "Source Sans Pro";
  font-size: 12px;
  line-height: 142.69%;
  font-weight: normal;
  margin-bottom: 32px;
  color: ${props => props.theme.colors.black};
  display: block;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    font-size: 1rem;
    line-height: 1.375rem;
  }
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
