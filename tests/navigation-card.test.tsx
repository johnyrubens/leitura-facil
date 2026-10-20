import { fireEvent, render, screen } from '@testing-library/react-native';
import { Image, StyleSheet } from 'react-native';
import { NavigationCard } from '../src/components/ui';
import { colors, opacity } from '../src/theme';
import ExamplesScreen from '../app/navigation-card-examples';

const mockReplace = jest.fn();
jest.mock('expo-router', () => ({ useRouter: () => ({ replace: mockReplace }) }));

const thumbnail = { uri: 'https://example.com/thumbnail.png' };
const props = {
  title: 'Dashboard',
  description: 'Resumo das leituras',
  thumbnail,
  onPress: jest.fn(),
};

test('aciona callback, atualiza conteúdo e imagem e permite ocultar chevron', () => {
  const press = jest.fn();
  const result = render(<NavigationCard {...props} onPress={press} />);
  fireEvent.press(screen.getByRole('button', { name: 'Dashboard. Resumo das leituras' }));
  expect(press).toHaveBeenCalledTimes(1);
  expect(result.UNSAFE_getByType(Image).props.source).toEqual(thumbnail);
  expect(screen.getByText('\ue5cc', { includeHiddenElements: true })).toBeOnTheScreen();

  const localImage = require('../assets/images/icon.png');
  result.rerender(
    <NavigationCard
      {...props}
      title="Novo título"
      description="Nova descrição"
      thumbnail={localImage}
      accessibilityLabel="Abrir detalhes"
      showChevron={false}
    />,
  );
  expect(screen.getByText('Novo título', { includeHiddenElements: true })).toBeOnTheScreen();
  expect(screen.getByText('Nova descrição', { includeHiddenElements: true })).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Abrir detalhes' })).toBeOnTheScreen();
  expect(screen.queryByText('\ue5cc', { includeHiddenElements: true })).toBeNull();
  expect(result.UNSAFE_getByType(Image).props.source).toEqual(localImage);
});

test('prioriza pressed sobre hover e disabled sobre ambos; mantém indicação de foco', () => {
  const press = jest.fn();
  const result = render(<NavigationCard {...props} onPress={press} testID="card" />);
  const getStyle = (pressed: boolean) => {
    const pressable = result
      .UNSAFE_getAllByProps({ testID: 'card' })
      .find((node) => typeof node.props.style === 'function');
    return StyleSheet.flatten(pressable!.props.style({ pressed }));
  };

  expect(getStyle(false).backgroundColor).toBe(colors.surface);
  fireEvent(screen.getByTestId('card'), 'hoverIn');
  expect(getStyle(false).backgroundColor).toBe(colors.surfaceHover);
  expect(getStyle(false).borderColor).toBe(colors.borderHover);
  expect(getStyle(true).backgroundColor).toBe(colors.surfacePressed);
  expect(getStyle(true).borderColor).toBe(colors.border);
  fireEvent(screen.getByTestId('card'), 'focus');
  expect(getStyle(false).borderColor).toBe(colors.borderFocus);
  fireEvent(screen.getByTestId('card'), 'blur');
  fireEvent(screen.getByTestId('card'), 'hoverOut');
  expect(getStyle(false).borderColor).toBe(colors.border);

  fireEvent(screen.getByTestId('card'), 'hoverIn');
  result.rerender(<NavigationCard {...props} onPress={press} testID="card" disabled />);
  fireEvent.press(screen.getByRole('button'));
  expect(press).not.toHaveBeenCalled();
  expect(screen.getByRole('button')).toBeDisabled();
  expect(getStyle(true).backgroundColor).toBe(colors.surfaceDisabled);
  expect(getStyle(true).opacity).toBe(opacity.disabled);
});

test('exemplos executam ações distintas e oferecem retorno à Home', () => {
  render(<ExamplesScreen />);
  fireEvent.press(screen.getByRole('button', { name: /^Dashboard\./ }));
  expect(
    screen.getByText('Dashboard selecionado: resumo demonstrativo das leituras.'),
  ).toBeOnTheScreen();
  fireEvent.press(screen.getByRole('button', { name: /^Relatórios\./ }));
  expect(
    screen.getByText('Relatórios selecionados: consulta demonstrativa, sem exportação.'),
  ).toBeOnTheScreen();
  fireEvent.press(screen.getByRole('button', { name: /^Configurações\./ }));
  const message = 'Configurações selecionadas: nenhuma preferência foi alterada.';
  expect(screen.getByText(message)).toBeOnTheScreen();
  fireEvent.press(screen.getByRole('button', { name: /^Relatórios indisponíveis\./ }));
  expect(screen.getByText(message)).toBeOnTheScreen();
  fireEvent.press(screen.getByRole('button', { name: 'Voltar para Home' }));
  expect(mockReplace).toHaveBeenCalledWith('/');
});
