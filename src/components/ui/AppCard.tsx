import { View, type ViewProps } from 'react-native';
import { colors, spacing, radius, type ColorToken } from '@/theme';
export interface AppCardProps extends ViewProps {
  padding?: keyof typeof spacing;
  background?: ColorToken;
  rounded?: keyof typeof radius;
}
export function AppCard({
  padding = 'md',
  background = 'white',
  rounded = 'lg',
  style,
  ...props
}: AppCardProps) {
  return (
    <View
      {...props}
      style={[
        {
          padding: spacing[padding],
          backgroundColor: colors[background],
          borderRadius: radius[rounded],
        },
        style,
      ]}
    />
  );
}
