import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/virufyLogo.svg';

export const ThankYouLayout = styled.div`
  text-align: left;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
    margin: 0 auto;
  }
`;

export const ThankYouLogo = styled(Logo)`
  display: none;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    display: block;
    margin: 250px auto 50px;
    width: 112px;
  }
`;

export const ThankYouTitle = styled.h1`
  font-family: "Open Sans";
  font-weight: bold;
  font-size: 34px;
  line-height: 142.69%;
  text-align: left;
  color: ${props => props.theme.colors.darkBlack};
`;

export const SubmissionIdBox = styled.div`
  margin: 56px 0 60px;
  font-family: 'Source Sans Pro';
  font-size: 16px;
  line-height: 25px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkBlack};
  background-color: ${({ theme }) => theme.colors.green_05};
  border-radius: 10px;
  padding: 16px 0px;
`;

export const BeforeSubmitText = styled.p<{ color?: 'primary' }>`
  font-family: 'Source Sans Pro';
  font-size: 14px;
  line-height: 142.69%;
  margin-bottom: 2px;
  color: ${props => {
    switch (props.color) {
      case 'primary':
        return props.theme.colors.green;
      default:
        return props.theme.colors.darkBlack;
    }
  }};
`;

export const InstallPwa = styled.button`
  color: ${props => props.theme.colors.green};
  background-color: transparent;
  border: 0;
  font-weight: 700;
  padding: 0;
`;
