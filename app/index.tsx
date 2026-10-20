import { AppScreen, AppText, AppCard, AppButton } from '@/components/ui';
import { useSessionStore } from '@/stores/session';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const session = useSessionStore((state) => state.session);
  const signOut = useSessionStore((state) => state.signOut);
  return (
    <AppScreen scrollable>
      <AppText variant="headingXL" accessibilityRole="header">
        Leitura Fácil
      </AppText>
      <AppCard>
        <AppText variant="headingM">Olá, {session?.username}!</AppText>
        <AppText>Home provisória — ambiente de demonstração.</AppText>
      </AppCard>
      <AppButton
        label="Exemplos de NavigationCard"
        variant="outline"
        onPress={() => router.push('/navigation-card-examples')}
      />
      <AppButton label="Sair" variant="outline" onPress={signOut} />
      <AppButton
        label="Exemplos de NavigationCardGrid"
        variant="outline"
        onPress={() => router.push('/navigation-card-grid-examples')}
      />
    </AppScreen>
  );
}
