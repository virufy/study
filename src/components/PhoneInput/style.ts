import styled from 'styled-components';

export const PhoneContainer = styled.div`
  display: flex;
`;

export const TelephonePrefix = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-family: 'Source Sans Pro';
  font-weight: bold;
  line-height: 24px;
  padding-left: 8px;
`;

export const PhoneInputStyled = styled.input`
  position: relative;

  height: 50px;
  border: 1px solid #E6E6E6;
  border-radius: 4px;
  width: 100%;
  font-family: 'Source Sans Pro';
  line-height: 24px;
  padding: 13px 14px;
  padding-left: 45px;
  ::placeholder {
    color: ${props => props.theme.colors.placeholderGray};
  }
  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
    padding: 13px 30px;
    padding-left: 45px;
  }
`;
