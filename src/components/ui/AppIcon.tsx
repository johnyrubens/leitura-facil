import { Text, type TextProps } from 'react-native';
import { colors, type ColorToken, theme } from '@/theme';

// Official Material Symbols codepoints; names match Figma and Google's catalog.
export const iconGlyphs = {
  visibility: '\ue8f4',
  visibility_off: '\ue8f5',
  check: '\ue5ca',
  person: '\ue7fd',
  mail: '\ue158',
  lock: '\ue897',
  calendar_month: '\uebcc',
  water_drop: '\ue798',
  local_fire_department: '\uef55',
  arrow_back: '\ue5c4',
  chevron_right: '\ue5cc',
  error: '\ue000',
} as const;
export interface AppIconProps extends Omit<TextProps, 'children'> {
  name: keyof typeof iconGlyphs;
  size?: number;
  color?: ColorToken;
}
export function AppIcon({
  name,
  size = theme.spacing.lg,
  color = 'neutral600',
  accessibilityLabel,
  style,
  ...props
}: AppIconProps) {
  return (
    <Text
      {...props}
      accessible={Boolean(accessibilityLabel)}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          fontFamily: 'MaterialSymbolsRounded',
          fontSize: size,
          lineHeight: size,
          color: colors[color],
        },
        style,
      ]}
      allowFontScaling={false}
    >
      {iconGlyphs[name]}
    </Text>
  );
}
