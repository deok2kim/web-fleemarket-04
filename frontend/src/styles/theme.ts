import { animations } from './animations';
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

export type TAnimationScheme = typeof animations;

export type TAnimationTheme = {
  animation: TAnimationScheme;
};

export const theme: TColorTheme & TFontTheme & TAnimationTheme = {
  color: colors,
  fonts: fonts,
  animation: animations,
};

export type TStyledTheme = typeof theme;
