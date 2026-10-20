import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  StyleSheet,
  type ViewProps,
  type ScrollViewProps,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { colors, theme, type ColorToken } from '@/theme';
export interface AppScreenProps extends ViewProps {
  background?: ColorToken;
  scrollable?: boolean;
  avoidKeyboard?: boolean;
  keyboardVerticalOffset?: number;
  edges?: Edge[];
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
}
export function AppScreen({
  background = 'neutral050',
  scrollable = false,
  avoidKeyboard = true,
  keyboardVerticalOffset = 0,
  edges = ['top', 'bottom', 'left', 'right'],
  contentContainerStyle,
  children,
  style,
  ...props
}: AppScreenProps) {
  return (
    <SafeAreaView
      {...props}
      edges={edges}
      style={[styles.fill, { backgroundColor: colors[background] }, style]}
    >
      <KeyboardAvoidingView
        style={styles.fill}
        enabled={avoidKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {scrollable ? (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={[styles.content, contentContainerStyle]}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.content, contentContainerStyle]}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { flexGrow: 1, padding: theme.spacing.lg, gap: theme.spacing.md },
});
