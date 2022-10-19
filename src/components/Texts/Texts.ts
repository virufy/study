import styled from 'styled-components';
import { colors } from 'theme';

export const HeaderTitle = styled.div`
  text-align: center; 
  font-family: 'Open Sans';
  font-size: 14px;
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
  font-weight: 400;
  line-height: 30.59px;
  color: ${colors.purple};
  font-size: 24px;
  margin-top: 34px;
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
  text-align: center;
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

  padding-left: 20px;
  padding-right: 20px;
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

export const PurpleTextBold = styled.h2`
  font-family: 'Source Sans Pro';
  font-size: 0.875rem;
  line-height: 20px;
  color: ${colors.purple};
  font-weight: 600;
  text-align: center;
`;

export const JapanTitle = styled(BaseTitle)`
  font-size: 16px;
  text-align: left;
  margin-bottom: 10px;
`;

export const JapanFooter = styled(BaseTitle)`
  font-size: 16px;
`;
