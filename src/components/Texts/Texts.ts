import styled from 'styled-components';
import { colors } from 'theme';

export const HeaderTitle = styled.div`
  text-align: center; 
  font-family: 'Source Sans Pro';
  font-size: 0.875rem;
  line-height: 20px;
  color: ${colors.purple};
  font-weight: 700;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 38px;
`;

export const BaseTitle = styled.div`
  font-family: 'Open Sans';
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 34.24px;
`;

export const TitlePurple = styled.div`
  text-align: center; 
  font-family: 'Biko';
  font-weight: 700;
  line-height: 34.24px;
  color: ${colors.purple};
  font-size: 32px;
  margin-top: 54px;
  margin-right: 20px;
  margin-left: 20px;
`;

export const TitleBlack = styled.div`
  font-family: 'Open Sans';
  font-weight: 700;
  line-height: 34.24px;
  color: ${colors.mineShaft};
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const BlackText = styled.h2`
  font-family: 'Source Sans Pro';
  font-size: 0.875rem;
  line-height: 20px;
  color: ${colors.mineShaft};
  text-align: left;
  font-weight: 400;
  margin-left: auto;
  margin-right: auto;
  white-space: pre-wrap;

  max-width: 320px;
  width: 100%;
  
  > p {
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }

  @media screen and (${props => props.theme.breakpoints.tablet}){
    font-size: 1rem;
    max-width: 470px;
  }
`;
