import { useState } from 'react';
import { useRouter } from 'expo-router';
import { AppButton, AppScreen, AppText, NavigationCard } from '@/components/ui';

const dashboardImage = require('../assets/images/tabIcons/home.png');
const reportsImage = require('../assets/images/tabIcons/explore.png');
const settingsImage = require('../assets/images/icon.png');

export default function NavigationCardExamplesScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('Toque em um card para experimentar sua ação.');

  return (
    <AppScreen scrollable>
      <AppButton label="Voltar para Home" variant="outline" onPress={() => router.replace('/')} />
      <AppText variant="headingXL" accessibilityRole="header">
        Exemplos de NavigationCard
      </AppText>
      <AppText color="textSecondary">
        Ações demonstrativas, sem alterar dados ou abrir funcionalidades futuras.
      </AppText>
      <NavigationCard
        title="Dashboard"
        description="Veja o resumo das leituras e acompanhe o progresso da competência."
        thumbnail={dashboardImage}
        onPress={() => setMessage('Dashboard selecionado: resumo demonstrativo das leituras.')}
      />
      <NavigationCard
        title="Relatórios"
        description="Consulte relatórios de água e gás. Esta descrição longa demonstra a quebra de linha e o crescimento do card em telas estreitas e com fontes ampliadas, sem sobrepor a miniatura ou o chevron."
        thumbnail={reportsImage}
        onPress={() =>
          setMessage('Relatórios selecionados: consulta demonstrativa, sem exportação.')
        }
      />
      <NavigationCard
        title="Configurações"
        description="Experimente um card sem chevron."
        thumbnail={settingsImage}
        showChevron={false}
        onPress={() => setMessage('Configurações selecionadas: nenhuma preferência foi alterada.')}
      />
      <NavigationCard
        title="Relatórios indisponíveis"
        description="Exemplo desabilitado: o toque não executa a ação."
        thumbnail={reportsImage}
        disabled
        onPress={() => setMessage('Esta ação não deve ser executada.')}
      />
      <AppText accessibilityLiveRegion="polite">{message}</AppText>
    </AppScreen>
  );
}
