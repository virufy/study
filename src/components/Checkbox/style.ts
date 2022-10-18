import styled, { css } from 'styled-components';
import FullWidthDiv from 'components/FullWidthDiv';

interface StyledCheckboxContainerProps {
  isChecked: boolean | undefined;
  fontWeight?: number;
  margin: string;

}

interface StyledCheckboxLabelProps {
  htmlFor: string;
  checkboxLeftOffsetPosition: number;
}

interface StyledCheckboxInputProps {
  checkboxLeftOffsetPosition: number;
}

export const StyledCheckboxContainer = styled(FullWidthDiv)<StyledCheckboxContainerProps>`
  display: flex;
  font-family: "Source Sans Pro";
  font-size: 0.875rem;
  line-height: 1.25rem;
  ${({ fontWeight }) => fontWeight && css`font-weight: ${fontWeight};`}
  padding: 0 0 16px 0;
  position: relative;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
    margin: auto;
    width: 100%;
  }
`;

export const StyledCheckboxInput = styled.input.attrs(() => ({
  type: 'checkbox',
}))<StyledCheckboxInputProps>`
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 2V16H2V2H16ZM16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z' fill='%2321242C'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  color: black;
  cursor: pointer;
  display: inline-block;
  height: 18px;
  left: ${props => props.checkboxLeftOffsetPosition}px;
  outline: 0;
  position:absolute;
  width: 18px;
  border: 0;
  border-radius: 0;
  transform: translateY(4px);

  &:checked{
    height: 18px;
    width: 28px;
    background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2H16V16ZM14.99 6L13.58 4.58L6.99 11.17L4.41 8.6L2.99 10.01L6.99 14L14.99 6Z' fill='%2321242C'/%3E%3C/svg%3E%0A");
  }
`;

export const StyledCheckboxInputLabel = styled.label<StyledCheckboxLabelProps>`
  margin: auto;
  margin-left:  ${({ checkboxLeftOffsetPosition }) => checkboxLeftOffsetPosition + 32}px;
  margin-right: 20px;
`;
