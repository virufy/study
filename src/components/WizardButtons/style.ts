import styled from 'styled-components';

export const WizardButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: ${props => `calc(100% - ${props.theme.layout.generalPaddingAmount * 2}px)`};
  margin: 0 auto;

  button {
    flex: 1;
    min-height: 50px;
    margin-bottom: 8px;

    &:first-of-type {
      margin-left: 0px !important;
    }
  }

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
  }
`;
