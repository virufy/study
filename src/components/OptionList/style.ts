import styled from 'styled-components';

export const OptionListItem = styled.button<{lastItem: boolean; isSelected?: boolean}>`
  width: 100%;
  max-width: 335px;
  height: 50px; 
  position: relative;
  font-family: 'Source Sans Pro'; /* It could be removed if default on body changes */
  color: ${props => props.theme.colors.darkBlack};
  font-size: 14px;
  text-align: left;
  padding: 0 20px;
  margin: 3px auto;
  border: none;
  border-radius: 10px;
  background-color: ${props => (props.isSelected ? props.theme.colors.purple_10 : props.theme.colors.mercury)};
  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
    text-align: center;
  }
`;

export const OptionListAddOtherButton = styled(OptionListItem)`
  font-weight: bold;
`;

export const OptionListCheck = styled.div<{ isSelected?: boolean }>`
  width: 22px;
  height: 22px; 
  border-radius: 50%;
  border: 3px solid ${props => (props.isSelected ? props.theme.colors.purple : '#C1C1C1')};
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 14px;
  margin-right: 29px;
  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin-right: 31px;
  }
`;

export const OptionListInputContainer = styled.div`
  position: relative;
  display: inline-block;
  width: calc(100% + 40px);
  margin: 0 -20px;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
  }
`;

export const OptionListInput = styled.input<{isSelected: boolean}>`
  height: 50px; 
  font-family: 'Source Sans Pro'; /* It could be removed if default on body changes */
  color: ${props => props.theme.colors.darkBlack};
  width: 100%;
  padding: 0 20px;
  border: none;
  background-color: ${props => (props.isSelected ? props.theme.colors.green_25 : 'transparent')};
  border-top: 1px ${props => props.theme.colors.darkBlack_04} solid;
  border-bottom: 1px ${props => props.theme.colors.darkBlack_04} solid;
  ::placeholder {
    color: ${props => props.theme.colors.midDarkGray};
  }
  @media screen and (${props => props.theme.breakpoints.tablet}){
    text-align: center;
  }
`;
