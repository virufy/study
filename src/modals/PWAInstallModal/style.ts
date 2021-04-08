import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  width: 100%;
`;

export const CloseButton = styled.button.attrs(() => ({ type: 'button' }))`
  position: absolute;
  left: 15px;
  top: 15px;
  border: 0;
  background: none;
  > svg {
    width: 18px;
    height: 18px;
  }
`;

export const IOsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 28px;
  left: 50%;

  > *:first-child {
    margin-bottom: 15px;
    color: #21242C;
    font-family: "Open Sans";
  }

  > svg {
    cursor: pointer;
    width: 41px;
    height: 41px;
    display: block;
    transform: rotate(180deg);

    path {
      fill: #21242C;
    }
  }
`;

export const ChromeContainer = styled.div`
  display: flex;
  position: absolute;
  top: 9px;
  right: 13px;

  > *:first-child {
    color: #21242C;
    font-family: "Open Sans";
    width: 198px;
    padding: 8px 15px;
    margin-top: 18px;
  }

  > svg {
    cursor: pointer;
    display: block;
    width: 41px;
    height: 41px;

    path {
      fill: #21242C;
    }
  }
`;
