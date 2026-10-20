import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { theme, fonts } from '@/theme';
import { AppText } from './AppText';
import { AppIcon, type AppIconProps } from './AppIcon';

export interface AppInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label: string;
  type?: 'text' | 'email' | 'number' | 'password';
  error?: string;
  disabled?: boolean;
  leftIcon?: AppIconProps['name'];
}
export function AppInput({
  label,
  type = 'text',
  error,
  disabled = false,
  leftIcon,
  editable = true,
  value,
  onFocus,
  onBlur,
  style,
  accessibilityLabel = label,
  accessibilityHint,
  ...props
}: AppInputProps) {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const blocked = disabled || !editable;
  return (
    <View style={styles.container}>
      <AppText variant="labelM">{label}</AppText>
      <View
        style={[
          styles.field,
          value ? styles.filled : undefined,
          focused && styles.focused,
          error ? styles.error : undefined,
          blocked && styles.disabled,
        ]}
      >
        {leftIcon && <AppIcon name={leftIcon} color="neutral600" style={styles.leftIcon} />}
        <TextInput
          {...props}
          value={value}
          editable={!blocked}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={
            error
              ? `${accessibilityHint ? `${accessibilityHint}. ` : ''}${error}`
              : accessibilityHint
          }
          accessibilityState={{ ...props.accessibilityState, disabled: blocked }}
          keyboardType={
            props.keyboardType ??
            (type === 'email' ? 'email-address' : type === 'number' ? 'decimal-pad' : 'default')
          }
          autoCapitalize={
            props.autoCapitalize ?? (type === 'email' || type === 'password' ? 'none' : 'sentences')
          }
          autoCorrect={props.autoCorrect ?? (type !== 'email' && type !== 'password')}
          secureTextEntry={type === 'password' && !visible}
          placeholderTextColor={theme.colors.neutral['600']}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          style={[styles.input, style]}
        />
        {type === 'password' && (
          <Pressable
            disabled={blocked}
            accessibilityRole="button"
            accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
            accessibilityState={{ disabled: blocked }}
            onPress={() => setVisible(!visible)}
            style={styles.toggle}
          >
            <AppIcon name={visible ? 'visibility_off' : 'visibility'} />
          </Pressable>
        )}
      </View>
      {error && (
        <AppText
          variant="caption"
          color="danger500"
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {error}
        </AppText>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { gap: theme.spacing.sm },
  field: {
    minHeight: theme.controlHeight,
    borderWidth: 1,
    borderColor: theme.colors.neutral['300'],
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filled: { borderColor: theme.colors.neutral['600'] },
  focused: { borderColor: theme.colors.primary['500'] },
  error: { borderColor: theme.colors.danger['500'] },
  disabled: { backgroundColor: theme.colors.neutral['050'], opacity: 0.5 },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: theme.controlHeight,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontFamily: fonts.regular,
    fontSize: theme.typography.body,
    color: theme.colors.neutral['900'],
  },
  leftIcon: { marginLeft: theme.spacing.md },
  toggle: {
    minHeight: theme.controlHeight,
    minWidth: theme.controlHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
