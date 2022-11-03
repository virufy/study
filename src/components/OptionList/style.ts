import styled from 'styled-components';

export const OptionListItem = styled.button<{lastItem: boolean; isSelected?: boolean}>`
  width: 100%;
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
    text-align: left;
  }
`;

export const OptionListItemLabel = styled.span`
  display: block;
  width: 250px;
  @media screen and (${props => props.theme.breakpoints.tablet}){
    width: auto;
    text-align: left;
    margin: auto;
  }
`;

export const OptionListAddOtherButton = styled(OptionListItem)`
  font-weight: bold;
`;

export const OptionListCheck = styled.div<{ isSelected?: boolean; checkbox?: boolean }>`
  width: 22px;
  height: 22px; 
  border-radius: ${props => (props.checkbox ? '10%' : '50%')};
  border: 3px solid ${props => (props.isSelected ? props.theme.colors.purple : '#C1C1C1')};
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 14px;
  margin-right: 29px;
  
  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin-right: 31px;
  }

  &:after{
    content: '';
    position: absolute; 
    left: ${props => (props.checkbox ? '0%' : '2px')}; 
    top: ${props => (props.checkbox ? '0%' : '2px')};
    height: ${props => (props.checkbox ? '16px' : '12px')};
    width: ${props => (props.checkbox ? '16px' : '12px')};
    border-radius: ${props => (props.checkbox ? '0%' : '50%')};
    background-color: ${props => (props.checkbox ? props.theme.colors.purple_10 : props.theme.colors.purple)}; 
    display: ${props => (props.isSelected ? 'block' : 'none')};
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.0005 2L6.00018 10L2 6.00018' stroke='%233578DE' stroke-width='2.18192' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 16px 16px;
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
