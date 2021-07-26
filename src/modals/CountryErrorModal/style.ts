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

export const ModalLink = styled.a`
    display: flex;
    justify-content: center; 
    align-items: center;
    width: 100%;
    max-width: 305px;
    height: 52px;
    border-radius: 15px;
    background-color: #3578DE;
    padding: 10px 20px;

    color: #FFFFFF;
    font-family: 'Source Sans Pro';
    font-weight: 600;
    line-height: 20px;
    font-size: 14px;
    text-align: center;
    text-decoration: none;

    :hover {
      text-decoration: none;
      color: #FFFFFF;
    }
`;
