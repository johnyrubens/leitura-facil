import { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import {
  AppButton,
  AppScreen,
  AppText,
  NavigationCardGrid,
  type NavigationCardGridItem,
} from '@/components/ui';

const thumbnail = require('../assets/images/tabIcons/home.png');

export default function NavigationCardGridExamplesScreen() {
  const router = useRouter();
  const [narrow, setNarrow] = useState(false);
  const [message, setMessage] = useState('Selecione uma opção para experimentar.');
  const items: NavigationCardGridItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Resumo das leituras.',
      thumbnail,
      onPress: () => setMessage('Dashboard selecionado.'),
    },
    {
      id: 'reports',
      title: 'Relatórios',
      description:
        'Descrição longa para demonstrar que os cards desta linha acompanham a altura do maior conteúdo, com quebra de texto e espaço para fontes ampliadas.',
      thumbnail: require('../assets/images/tabIcons/explore.png'),
      onPress: () => setMessage('Relatórios selecionados.'),
    },
    {
      id: 'settings',
      title: 'Configurações',
      description: 'Exemplo sem chevron.',
      thumbnail: require('../assets/images/icon.png'),
      showChevron: false,
      onPress: () => setMessage('Configurações selecionadas.'),
    },
    {
      id: 'disabled',
      title: 'Indisponível',
      description: 'Este card está desabilitado.',
      thumbnail,
      disabled: true,
      onPress: () => setMessage('Esta ação não deve ser executada.'),
    },
    {
      id: 'help',
      title: 'Ajuda',
      description: 'Quinto item, à esquerda e com a mesma largura.',
      thumbnail,
      onPress: () => setMessage('Ajuda selecionada.'),
    },
  ];

  return (
    <AppScreen scrollable>
      <AppButton label="Voltar para Home" variant="outline" onPress={() => router.replace('/')} />
      <AppText variant="headingXL" accessibilityRole="header">
        Exemplos de NavigationCardGrid
      </AppText>
      <AppButton
        label={narrow ? 'Usar largura disponível' : 'Reduzir contêiner'}
        variant="outline"
        onPress={() => setNarrow(!narrow)}
      />
      <View style={narrow ? styles.narrow : styles.full}>
        <NavigationCardGrid items={items} testID="example-grid" />
      </View>
      <AppText accessibilityLiveRegion="polite">{message}</AppText>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  full: { width: '100%' },
  narrow: { width: '85%' },
});
