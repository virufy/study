import 'styled-components';
import { RebootTheme } from 'styled-reboot';
import { ThemeType } from 'theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType { }
}


