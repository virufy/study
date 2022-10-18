import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration-line: underline;

  margin-bottom: 35px;
  
  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin-bottom: 80px;
  }

  > a {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;

    color: ${props => props.theme.colors.purple} !important;
  }
`;
