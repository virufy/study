import styled from 'styled-components';

export const AppContainer = styled.div`
  margin: 0 auto;
  padding-bottom: 20px;

  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;


  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin: auto;
    /* padding: 54px 60px 80px 60px; */
    text-align: center;

    max-width: 768px;
    height: 100%;
    width: 100%;
  }
`;
