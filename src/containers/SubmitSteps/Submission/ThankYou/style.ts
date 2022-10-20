import styled from 'styled-components';
import { colors } from 'theme/index';

export const ThankYouLayout = styled.div`
  text-align: left;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const ThankYouTitle = styled.h1`
  font-family: "Open Sans";
  font-weight: bold;
  font-size: 30px;
  line-height: 142.69%;
  text-align: left;
  color: ${props => props.theme.colors.darkBlack};
  margin-bottom: 18px;
  margin-top: 34px;
`;

export const SubmissionIdBox = styled.div`
  margin: 40px 0px;
  font-family: 'Source Sans Pro';
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  background-color: ${colors.purple_5};
  color: ${colors.darkBlack};
  border-radius: 10px;
  padding: 16px 0px;
  border-radius: 10px;
`;

export const BeforeSubmitText = styled.p`
  font-family: 'Source Sans Pro';
  font-size: 14px;
  line-height: 142.69%;
  margin-bottom: 2px;
  color: ${colors.darkBlack};
`;
