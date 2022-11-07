import styled from 'styled-components';

import { ReactComponent as LogoXoorSVG } from 'assets/images/logo-xoor.svg';

export const Container = styled.div<{ inline: boolean; mt?: string; }>`
  display: flex;
  justify-content: ${({ inline }) => (inline ? 'center' : 'flex-end')};
  align-items: center;
  flex-direction: ${({ inline }) => (inline ? 'row' : 'column')};
  margin-top: ${({ mt }) => mt || '22px'};
  > * {
    margin: ${({ inline }) => (inline ? '0px 5px' : '5px 0px')};
  }
`;

export const Label = styled.div<{ color?: string; }>`
  font-family: "Open Sans";
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ color }) => color || '#393939'};
`;

export const Image = styled(LogoXoorSVG)`
  width: 60px;
`;
