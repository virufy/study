import styled from 'styled-components';

export const ModalBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    margin: auto;
`;

export const ModalTitle = styled.div`
  font-family: 'Biko';
  font-size: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const ModalContent = styled.div`
  font-family: 'Source Sans Pro';
  text-align: center;
  line-height: 25px;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 30px;
`;
