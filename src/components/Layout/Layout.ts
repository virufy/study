import styled from 'styled-components';

const Layout = styled.div`
  padding-bottom: 40px; 

  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin: auto;

    max-width: 768px;
    width: 100%;
  }
`;

export default Layout;
