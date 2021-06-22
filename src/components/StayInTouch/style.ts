import styled, { css } from 'styled-components';

export const Container = styled.div`
  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
  }
`;

export const Title = styled.h2`
  font-family: "Source Sans Pro";
  font-size: 24px;
  line-height: 1.427;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.realBlack};
  margin-bottom: 0;
  margin-top: 40px;
`;

export const Card = styled.div`
  border-radius: 10px;
  filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.15));
  background: #FFF;
  width: 100%;
  padding: 12px 20px 20px;
  margin-top: 32px;
`;

export const CardTitle = styled.div`
  font-family: "Source Sans Pro";
  font-size: 20px;
  line-height: 1.427;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.realBlack};
`;

export const CardDescription = styled.div`
  font-family: "Open Sans";
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkBlack};
  margin-top: 8px;
`;

const baseButton = css`
  background-color: ${({ theme }) => theme.colors.purple};
  
  color: ${({ theme }) => theme.colors.white};
  font-family: "Source Sans Pro";
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  
  padding: 13px 0;

  margin-top: 20px;

  text-align: center;
  width: 100%;

  border-radius: 15px;
`;

export const CardLink = styled.a.attrs(() => ({ target: '_blank', rel: 'noopener noreferrer' }))`
  ${baseButton}
  display: block;
  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const CardButton = styled.button.attrs(() => ({ type: 'button' }))`
  ${baseButton}
  border: none;
`;
