import { animations } from './animations';
import { colors } from './colors';
import { fonts } from './fonts';
import { zIndexes } from './zIndex';

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

export type TZIndexScheme = typeof zIndexes;

export type TZIndexTheme = {
  zIndex: TZIndexScheme;
};

export const theme: TColorTheme & TFontTheme & TAnimationTheme & TZIndexTheme = {
  color: colors,
  fonts: fonts,
  animation: animations,
  zIndex: zIndexes,
};

export type TStyledTheme = typeof theme;
