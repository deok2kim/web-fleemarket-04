import { colors } from './colors';
import { fonts } from './fonts';

export type TColorToken = keyof typeof colors;
export type TColorScheme = Record<TColorToken, string>;

export type TColorTheme = {
  color: TColorScheme;
};

export type TFontScheme = typeof fonts;

export type TFontTheme = {
  fonts: TFontScheme;
};

export const theme: TColorTheme & TFontTheme = {
  color: colors,
  fonts: fonts,
};

export type TStyledTheme = typeof theme;
