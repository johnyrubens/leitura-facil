import { ActivityIndicator, Pressable, StyleSheet, type PressableProps } from 'react-native';
import { theme } from '@/theme';
import { AppText } from './AppText';

export interface AppButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
}
export function AppButton({
  label,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  accessibilityLabel = label,
  accessibilityState,
  ...props
}: AppButtonProps) {
  const blocked = disabled || loading;
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ ...accessibilityState, disabled: blocked, busy: loading }}
      disabled={blocked}
      style={(state) => [
        styles.base,
        styles[variant],
        { opacity: blocked ? 0.5 : state.pressed ? 0.8 : 1 },
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      {loading && (
        <ActivityIndicator
          color={variant === 'primary' ? theme.colors.white : theme.colors.primary['700']}
        />
      )}
      <AppText variant="button" color={variant === 'primary' ? 'white' : 'primary700'}>
        {label}
      </AppText>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: {
    minHeight: theme.controlHeight,
    borderRadius: theme.radii.md,
    padding: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  primary: { backgroundColor: theme.colors.primary['500'] },
  secondary: { backgroundColor: theme.colors.primary['050'] },
  outline: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primary['500'],
  },
});
