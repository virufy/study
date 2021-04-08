import { defaultRebootTheme, RebootTheme } from 'styled-reboot';

export const colors = {
  realBlack: '#000000',
  realBlack_4: 'rgba(0, 0, 0, 0.04)', // #000000, 4%
  black: '#434334',
  darkBlack: '#21242C',
  darkBlack_20: 'rgba(33, 36, 44, 0.1)', // 21242C
  darkBlack_04: 'rgba(33, 36, 44, 0.04)', // 21242C
  darkBlack_65: 'rgba(33, 36, 44, 0.65)', // 21242C
  ultraDarkBlack: '#1F1F1F',
  lightGray: '#F2F2F2',
  gray: '#C4C4C4',
  midGray: '#DEDEDE',
  midDarkGray: '#D1D1D1',
  placeholderGray: '#BBBBBB',
  darkGray: '#434343',
  darkGray_50: 'rgba(67, 67, 67, 0.5)', // '#434343'
  darkGray_70: 'rgba(67, 67, 67, 0.7)', // '#434343'
  gray3: '#F5F5F5',
  green_25: 'rgba(0, 165, 136, 0.25)', // #00A588
  green_05: 'rgba(0, 165, 136, 0.05)', // #00A588
  green: '#00A588',
  lightGreen_25: 'rgba(19, 194, 194, 0.25)', // #13C2C2, 25%
  white: '#FEFEFE', // white for all
  backgroundWhite: '#E5E5E5',
  red: '#F54E37',
};

export const layout = {
  generalPaddingAmount: 20,
  generalPaddingLeft: '20px',
  generalPaddingRight: '20px',
};

export const breakpoints = {
  tablet: 'min-width: 560px',
};

export const theme = {
  ...defaultRebootTheme,
  colors,
  breakpoints,
  layout,
};

export interface ThemeType extends RebootTheme {
  colors: typeof colors
  breakpoints: typeof breakpoints
  layout: typeof layout
}
