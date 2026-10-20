import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { borders, colors, opacity, radius, shadows, spacing } from '@/theme';
import { AppIcon } from './AppIcon';
import { AppText } from './AppText';

export interface NavigationCardProps {
  title: string;
  description: string;
  thumbnail: ImageSourcePropType;
  onPress: () => void;
  showChevron?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  testID?: string;
}

export function NavigationCard({
  title,
  description,
  thumbnail,
  onPress,
  showChevron = true,
  disabled = false,
  style,
  accessibilityLabel = `${title}. ${description}`,
  testID,
}: NavigationCardProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [compact, setCompact] = useState(false);

  return (
    <Pressable
      testID={testID}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onLayout={({ nativeEvent }) => setCompact(nativeEvent.layout.width < 240)}
      onPress={() => {
        if (!disabled) onPress();
      }}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={({ pressed }) => [
        styles.card,
        !disabled && (pressed ? styles.pressed : hovered ? styles.hovered : undefined),
        !disabled && focused && styles.focused,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View
        style={[styles.contents, compact && styles.compactContents]}
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <Image source={thumbnail} resizeMode="cover" accessible={false} style={styles.thumbnail} />
        <View style={[styles.text, compact && styles.compactText]}>
          <AppText variant="headingM" color="textPrimary">
            {title}
          </AppText>
          <AppText variant="bodyM" color="textSecondary">
            {description}
          </AppText>
        </View>
        {showChevron && (
          <AppIcon name="chevron_right" size={20} color="textSecondary" style={styles.chevron} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    minHeight: 88,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: borders.thin,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  // Component-specific dimensions from COMP-001; no global tokens exist for 4/12/56/88.
  contents: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  thumbnail: { width: 56, height: 56, borderRadius: radius.sm, flexShrink: 0 },
  text: { flex: 1, minWidth: 0, gap: 4 },
  compactContents: { flexDirection: 'column', alignItems: 'flex-start' },
  compactText: { flex: 0, alignSelf: 'stretch' },
  chevron: { width: 20, flexShrink: 0 },
  hovered: { backgroundColor: colors.surfaceHover, borderColor: colors.borderHover },
  pressed: { backgroundColor: colors.surfacePressed },
  focused: { borderColor: colors.borderFocus },
  disabled: { backgroundColor: colors.surfaceDisabled, opacity: opacity.disabled },
});
