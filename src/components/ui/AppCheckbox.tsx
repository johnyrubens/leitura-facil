import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';
import { theme } from '@/theme';
import { AppText } from './AppText';
import { AppIcon } from './AppIcon';
export interface AppCheckboxProps extends Omit<PressableProps, 'children' | 'onPress'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}
export function AppCheckbox({
  checked,
  onChange,
  label,
  disabled = false,
  style,
  accessibilityState,
  ...props
}: AppCheckboxProps) {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityLabel={props.accessibilityLabel ?? label}
      accessibilityState={{ ...accessibilityState, checked, disabled: Boolean(disabled) }}
      onPress={() => onChange(!checked)}
      style={(state) => [
        styles.row,
        { opacity: disabled ? 0.5 : 1 },
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      <View style={[styles.box, checked && styles.checked]}>
        {checked && <AppIcon name="check" color="white" />}
      </View>
      <AppText style={styles.label}>{label}</AppText>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  row: {
    minHeight: theme.controlHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  box: {
    width: theme.spacing.lg,
    height: theme.spacing.lg,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    borderColor: theme.colors.neutral['600'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: theme.colors.primary['500'],
    borderColor: theme.colors.primary['500'],
  },
  label: { flexShrink: 1 },
});
