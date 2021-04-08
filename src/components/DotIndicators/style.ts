import styled from 'styled-components';

export const WelcomeWizardStepIndicators = styled.ul`
  display: flex;
  justify-content:center;
  padding: 0;
  margin-bottom: 22px;

 @media screen and (${props => props.theme.breakpoints.tablet}){
    margin-bottom: 40px;
  }
`;

export const WelcomeWizardStepIndicator = styled.li`
  background-color: ${props => props.theme.colors.gray};
  border-radius: 50%;
  display: inline-block;

  height: 7px;
  width: 7px;

  &:not(:first-of-type){
    margin-left: 6px;
  };

  &.active {
    background-color: ${props => props.theme.colors.darkBlack};
  };

`;
