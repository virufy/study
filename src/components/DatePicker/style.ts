import styled from 'styled-components';

export const StyledReactDatePickerContainer = styled.div`
  .react-datepicker-wrapper {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const DatePickerContainer = styled.button`
  background-color: ${props => props.theme.colors.lightGray};
  border-radius: 4px;
  border: none;
  padding: 0 19.69px 0 14px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LabelValueContainer = styled.div`
  flex: 1;
  text-align: left;
  padding-left: 14px;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Label = styled.div`
  font-family: Source Sans Pro;
  font-size: 12px;
  line-height: 142.69%;
  color: ${props => props.theme.colors.darkGray};
`;

export const Value = styled.div`
  font-family: Source Sans Pro;
  font-size: 14px;
  line-height: 142.69%;
  color: ${props => props.theme.colors.darkBlack};
`;
