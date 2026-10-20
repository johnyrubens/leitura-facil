import type { TextStyle } from 'react-native';

export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export const typography = {
  headingXL: { fontSize: 24, fontFamily: fonts.bold },
  headingL: { fontSize: 20, fontFamily: fonts.bold },
  headingM: { fontSize: 16, fontFamily: fonts.semibold },
  bodyL: { fontSize: 16, fontFamily: fonts.regular },
  bodyM: { fontSize: 14, fontFamily: fonts.regular },
  labelM: { fontSize: 14, fontFamily: fonts.medium },
  caption: { fontSize: 12, fontFamily: fonts.regular },
  readingNumber: { fontSize: 32, fontFamily: fonts.bold, fontVariant: ['tabular-nums'] },
  kpiNumber: { fontSize: 28, fontFamily: fonts.bold, fontVariant: ['tabular-nums'] },
  button: { fontSize: 16, fontFamily: fonts.semibold },
} satisfies Record<string, TextStyle>;
export type TypographyVariant = keyof typeof typography;
