import { renderRouter, screen, fireEvent, waitFor } from 'expo-router/testing-library';
import RootLayout from '../app/_layout';
import IndexScreen from '../app/index';
import HomeScreen from '../app/home';
import LoginScreen from '../app/login';
import ExamplesScreen from '../app/navigation-card-examples';
import GridExamplesScreen from '../app/navigation-card-grid-examples';
import { useSessionStore } from '../src/stores/session';

jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
  useFonts: () => [true, null],
}));
jest.mock('../src/database/provider', () => ({
  DatabaseProvider: ({ children }: { children: React.ReactNode }) => children,
}));

test('rota protegida redireciona ao Login, entra na Home e volta após logout', async () => {
  useSessionStore.getState().signOut();
  const result = renderRouter(
    {
      _layout: RootLayout,
      index: IndexScreen,
      home: HomeScreen,
      login: LoginScreen,
      'navigation-card-examples': ExamplesScreen,
      'navigation-card-grid-examples': GridExamplesScreen,
    },
    { initialUrl: '/home' },
  );
  await waitFor(() => expect(result.getPathname()).toBe('/login'));
  fireEvent.changeText(screen.getByLabelText('Usuário'), 'demo');
  fireEvent.changeText(screen.getByLabelText('Senha'), 'Leitura123!');
  fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));
  await waitFor(() => expect(result.getPathname()).toBe('/home'));
  fireEvent.press(screen.getByRole('button', { name: 'Exemplos de NavigationCardGrid' }));
  await waitFor(() => expect(result.getPathname()).toBe('/navigation-card-grid-examples'));
  fireEvent.press(screen.getByRole('button', { name: /^Dashboard\./ }));
  expect(screen.getByText('Dashboard selecionado.')).toBeOnTheScreen();
  fireEvent.press(screen.getByRole('button', { name: 'Reduzir contêiner' }));
  expect(screen.getByRole('button', { name: 'Usar largura disponível' })).toBeOnTheScreen();
  fireEvent.press(screen.getByRole('button', { name: 'Voltar para Home' }));
  await waitFor(() => expect(result.getPathname()).toBe('/home'));
  fireEvent.press(screen.getByRole('button', { name: 'Exemplos de NavigationCard' }));
  await waitFor(() => expect(result.getPathname()).toBe('/navigation-card-examples'));
  fireEvent.press(screen.getByRole('button', { name: 'Voltar para Home' }));
  await waitFor(() => expect(result.getPathname()).toBe('/home'));
  fireEvent.press(screen.getByRole('button', { name: 'Sair' }));

  await waitFor(() => expect(result.getPathname()).toBe('/login'));
  expect(useSessionStore.getState().session).toBeNull();
  for (let attempt = 0; attempt < 2; attempt += 1) {
    fireEvent.changeText(screen.getByLabelText('Usuário'), 'demo');
    fireEvent.changeText(screen.getByLabelText('Senha'), 'Leitura123!');
    fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));
    await waitFor(() => expect(result.getPathname()).toBe('/home'));
    expect(screen.getByText('Olá, demo!')).toBeOnTheScreen();
    fireEvent.press(screen.getByRole('button', { name: 'Sair' }));
    await waitFor(() => expect(result.getPathname()).toBe('/login'));
    expect(useSessionStore.getState().session).toBeNull();
  }
});
