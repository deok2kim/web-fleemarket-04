import 'styled-components';
import { TStyledTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends TStyledTheme {}
}
