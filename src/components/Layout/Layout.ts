import styled from 'styled-components';

const Layout = styled.div`
  padding-top: 16px;
  padding-bottom: 24px; 
  padding-left: ${props => props.theme.layout.generalPaddingLeft};
  padding-right: ${props => props.theme.layout.generalPaddingRight}; 

  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin: auto;
    padding: 0px 60px;

    max-width: 768px;
    width: 100%;
  }
`;

export default Layout;
