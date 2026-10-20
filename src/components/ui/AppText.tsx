import { Text, type TextProps, type TextStyle } from 'react-native';
import { colors, typography, type ColorToken, type TypographyVariant } from '@/theme';

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: ColorToken;
  align?: TextStyle['textAlign'];
}
export function AppText({
  variant = 'bodyL',
  color = 'neutral900',
  align,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[typography[variant], { color: colors[color], textAlign: align }, style]}
    />
  );
}
