import { defaultRebootTheme, RebootTheme } from 'styled-reboot';

export const colors = {
  realBlack: '#000000',
  realWhite: '#FFFFFF',
  black: '#434334',
  darkBlack: '#21242C',
  darkBlack_20: 'rgba(33, 36, 44, 0.1)', // 21242C
  darkBlack_04: 'rgba(33, 36, 44, 0.04)', // 21242C
  darkBlack_65: 'rgba(33, 36, 44, 0.65)', // 21242C
  ultraDarkBlack: '#1F1F1F',
  lightGray: '#F2F2F2',
  gray: '#C4C4C4',
  mercury: '#F9F9F9',
  midGrayBlue: '#EBF1FC',
  midGray: '#F5F8FD',
  midDarkGray: '#D1D1D1',
  mineShaft: '#393939',
  mineShaft_50: 'rgba(56, 56, 56, 0.5)', // 393939
  placeholderGray: '#BBBBBB',
  lightDarkGray: '#A3A3A3',
  darkGray: '#434343',
  darkGray_50: 'rgba(67, 67, 67, 0.5)', // '#434343'
  darkGray_70: 'rgba(67, 67, 67, 0.7)', // '#434343'
  gray3: '#F5F5F5',
  green_25: 'rgba(0,165,136,0.25)', // #00A588
  green: '#74ECA4',
  green_05: '#74ECA4',
  darkGreen: '#30DA74',
  lightGreen_25: 'rgba(19, 194, 194, 0.25)', // #13C2C2, 25%
  white: '#FEFEFE', // white for all
  backgroundWhite: '#E5E5E5',
  red: '#F54E37',
  purple: '#3578DE',
  lightPurple: '#7598F2',
  purple_50: 'rgba(53, 120, 222, 0.5)', // #3578DE 50%
  purple_10: 'rgba(53, 120, 222, 0.1)', // #3578DE 10%
  purple_5: 'rgba(53, 120, 222, 0.05)', // #3578DE 5%
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
