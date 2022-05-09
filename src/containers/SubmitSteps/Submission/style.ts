import styled from 'styled-components';

import { ReactComponent as ProcessingSVG } from 'assets/images/processing.svg';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuestionInput = styled.input`
  background-color: ${props => props.theme.colors.midGray};
  border-radius: 4px;
  border: 0;
  border-radius: 15px;
  color: ${props => props.theme.colors.mineShaft};
  font-family: 'Source Sans Pro';
  margin: auto;
  padding: 12px 15px;

  height: 48px;
  width: 100%;
  max-width: 320px;
  

  ::placeholder {
    color: #A3A3A3;
    font-size: 14px;
  }

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 348px;
    }
`;

export const CustomPurpleText = styled.h2<{ mb?: number; mt?: number; isLight?: boolean; left?: boolean}>`
  font-family: 'Biko';
  font-size: 24px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.purple}; 
  text-align: ${({ left }) => (left ? 'left' : 'center')};
  font-weight: ${({ isLight }) => (isLight ? '200' : '700')};
  margin: ${({ mt = 32 }) => mt}px auto ${({ mb = 32 }) => mb}px auto;
  white-space: pre-wrap;

  max-width: 320px;
  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 348px;
    text-align: center;
  }
`;

export const BoldBlackText = styled.h2`
  font-family: 'Biko';
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.mineShaft}; 
  text-align: left;
  font-weight: 700;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 16px;
  white-space: pre-wrap;

  max-width: 320px;
  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 348px;
  }
`;

export const Title = styled.h1`
  font-family: "Open Sans";
  font-weight: bold;
  font-size: 30px;
  line-height: 142.69%;
  text-align: center;
  color: ${props => props.theme.colors.darkBlack};
  margin-bottom: 8px;
  margin-top: 25px;
`;

export const ResultTitle = styled.h2<{ color?: string}>`
  font-family: "Open Sans";
  font-weight: bold;
  font-size: 22px;
  line-height: 142.69%;
  text-align: center;
  color: ${({ color }) => color};
  margin-bottom: 8px;
  margin-top: 25px;
`;

export const ImportantNote = styled.span<{ isBold?: boolean }>`
  font-family: "Source Sans Pro";
  font-size: 0.75rem;
  line-height: 1.42;
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
  max-width: 320px;
  margin: 52px auto 30px;
`;

export const ResultNote = styled.p<{ isBold?: boolean }>`
  font-family: "Source Sans Pro";
  font-size: 14px;
  line-height: 20px;
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
  max-width: 335px;
  margin: 52px auto;
`;

export const BeforeSubmitText = styled.p`
  font-family: 'Source Sans Pro';
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.theme.colors.red};
  text-align: center;
  margin-bottom: 16px;
`;

export const ImageProcessing = styled(ProcessingSVG)`
  width: 100%;
  height: 371px;
  display: block;
  margin-top: 69px;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    width: 100%;
  }
`;
