import styled from 'styled-components';
import { ReactComponent as Download } from 'assets/icons/download.svg';

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration-line: underline;
  color: ${props => props.theme.colors.purple} !important;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;

  margin-bottom: 43px;
  
  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin-bottom: 80px;
  }
`;

export const DownloadSVG = styled(Download)`
    width: 15px;
    height: 15px;
    margin-right:10px;
`;
