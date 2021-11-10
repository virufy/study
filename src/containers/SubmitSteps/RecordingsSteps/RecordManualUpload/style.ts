import styled from 'styled-components';
import { colors } from 'theme';
import { BlackText } from 'components/Texts';

// Assets
import { ReactComponent as Clouds } from 'assets/images/clouds.svg';
import { ReactComponent as Arrow } from 'assets/icons/arrowUp.svg';

export const MainContainer = styled.div`
  width: 100%; 
  max-width: 320px; 
  margin: auto; 

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 64px;
    max-width: 470px;
  }
`;

export const TextAddFile = styled(BlackText).attrs({ dark: true, fontSize: '1rem' })`
  text-align: center;
  line-height: 24px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    font-size: 1.75rem;
  }
`;

export const TextFileConstraints = styled(BlackText).attrs({ dark: true, fontSize: '0.625rem' })`
  text-align: center;
  line-height: 24px;
  color: ${props => props.theme.colors.darkGray};

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    font-size: 1rem;
    margin-top: 20px;
  }
`;

export const TextErrorContainer = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.red};
  font-family: 'Source Sans Pro';
  display: 'flex';
  height: 50px;
`;

export const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 0 auto;
  position: relative;
`;

export const UploadInput = styled.input`
  display: none;
`;

export const UploadButton = styled.label`
  width: 98px;
  height: 98px;
  background-color: #EBF1FC;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  margin-top: -40%;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 200px;
    height: 200px;
    margin-bottom: 30px;
  }
`;

export const ArrowUp = styled(Arrow)`
  width: 39px;
  height: 39px;
  position: absolute; 
  bottom: 55%;
  pointer-events: none;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: 60%;
  } 
`;

export const CloudsSVG = styled(Clouds)`
  width: 197px;
  height: 122px;
  margin: 0 auto;
  margin-top: 110px;
  display: block;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 374px;
    height: 299px;
  }
`;
