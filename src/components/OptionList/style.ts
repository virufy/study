import styled from 'styled-components';
import { ReactComponent as CheckSvg } from 'assets/icons/check.svg';

export const OptionListItem = styled.button<{lastItem: boolean; isSelected?: boolean}>`
  position: relative;
  height: 50px; 
  font-family: 'Source Sans Pro'; /* It could be removed if default on body changes */
  color: ${props => props.theme.colors.darkBlack};
  font-size: 14px;
  text-align: left;
  width: calc(100% + 40px);
  padding: 0 20px;
  margin: 0 -20px;
  border: none;
  background-color: ${props => (props.isSelected ? props.theme.colors.green_25 : 'transparent')};
  border-top: 1px ${props => props.theme.colors.darkBlack_04} solid;
  border-bottom: ${props => (props.lastItem ? `1px ${props.theme.colors.darkBlack_04} solid` : 'none')};
  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
    text-align: center;
  }
`;

export const OptionListAddOtherButton = styled(OptionListItem)`
  font-weight: bold;
`;

export const OptionListCheck = styled(CheckSvg)`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 18px;
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
