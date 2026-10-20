import { colors, palette } from './colors';
import { borders, opacity, shadows } from './effects';
import { spacing } from './spacing';
import { radius } from './radius';
import { fonts, typography } from './typography';
export const theme = {
  colors: palette,
  semanticColors: colors,
  borders,
  opacity,
  shadows,
  spacing,
  radii: radius,
  typography: { ...fonts, title: typography.headingXL.fontSize, body: typography.bodyL.fontSize },
  controlHeight: 50,
} as const;
