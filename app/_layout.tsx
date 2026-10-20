import { Component, type ReactNode } from 'react';
import { Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DatabaseProvider } from '@/database/provider';
import { theme } from '@/theme/tokens';
import { useSessionStore } from '@/stores/session';

class InitializationBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <InitializationMessage text="Não foi possível preparar o aplicativo. Reinicie para tentar novamente." />
    ) : (
      this.props.children
    );
  }
}

function InitializationMessage({ text }: { text: string }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: theme.spacing.lg }}>
      <Text accessibilityRole="alert">{text}</Text>
    </View>
  );
}

export default function RootLayout() {
  const authenticated = useSessionStore((state) => state.session !== null);
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    MaterialSymbolsRounded: require('../src/assets/fonts/MaterialSymbolsRounded.ttf'),
  });
  if (error)
    return (
      <InitializationMessage text="Não foi possível carregar as fontes. Reinicie o aplicativo." />
    );
  if (!loaded) return <InitializationMessage text="Preparando aplicativo…" />;
  const routes = (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!authenticated}>
        <Stack.Screen name="login" />
      </Stack.Protected>
      <Stack.Protected guard={authenticated}>
        <Stack.Screen name="index" />
        <Stack.Screen name="navigation-card-examples" />
        <Stack.Screen name="navigation-card-grid-examples" />
      </Stack.Protected>
    </Stack>
  );
  return (
    <SafeAreaProvider>
      <InitializationBoundary>
        <DatabaseProvider>{routes}</DatabaseProvider>
      </InitializationBoundary>
    </SafeAreaProvider>
  );
}
