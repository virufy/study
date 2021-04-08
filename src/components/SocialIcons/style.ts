import styled from 'styled-components';

const totalElements = 4;

export const Container = styled.div`
  margin: 44px auto 20px;
  @media (${props => props.theme.breakpoints.tablet}) {
    margin: 64px auto 20px;
  }
`;

export const SocialIconsTitle = styled.h2`
  font-family: "Source Sans Pro";
  font-size: 24px;
  line-height: 1.427;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.realBlack};
  margin-bottom: 0;
`;

export const SocialIconsContainer = styled.div`
  margin: 32px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 24px;
  
  @media (${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(${() => totalElements}, 96px);
    justify-content: center;
    grid-column-gap: 16px;
  }
`;

export const SocialLink = styled.a.attrs(() => ({}))`
  width: 100%;
  height: 92px;

  background: #FFFFFF;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  text-align: center;
  line-height: 92px;
  > svg {
    height: 36px;
    object-fit: cover;
  }
`;
