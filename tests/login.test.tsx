import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import LoginScreen from '../app/login';
import { loginSchema } from '../src/forms/loginSchema';
import { useSessionStore } from '../src/stores/session';
import * as authService from '../src/services/auth/mockAuthService';

beforeEach(() => useSessionStore.getState().signOut());

test('schema remove espaços externos do usuário e preserva senha', () => {
  expect(loginSchema.parse({ username: ' demo ', password: ' senha ' })).toEqual({
    username: 'demo',
    password: ' senha ',
  });
  expect(loginSchema.safeParse({ username: '   ', password: '' }).success).toBe(false);
});

test('campos vazios exibem erros e não criam sessão', async () => {
  render(<LoginScreen />);
  fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));
  expect(await screen.findByText('Informe seu usuário.')).toBeOnTheScreen();
  expect(screen.getByText('Informe sua senha.')).toBeOnTheScreen();
  expect(useSessionStore.getState().session).toBeNull();
});

test('credenciais incorretas falham e demonstrativas criam sessão sem senha', async () => {
  const authenticate = jest.spyOn(authService, 'authenticateMock');
  render(<LoginScreen />);
  fireEvent.changeText(screen.getByLabelText('Usuário'), ' demo ');
  fireEvent.changeText(screen.getByLabelText('Senha'), 'errada');
  fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));
  fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled());
  expect(authenticate).toHaveBeenCalledTimes(1);
  expect(await screen.findByText('Usuário ou senha inválidos. Tente novamente.')).toBeOnTheScreen();
  expect(useSessionStore.getState().session).toBeNull();
  fireEvent.changeText(screen.getByLabelText('Senha'), 'Leitura123!');
  fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));
  await waitFor(() =>
    expect(useSessionStore.getState().session).toEqual({ username: 'demo', mode: 'mock' }),
  );
  expect(screen.getByLabelText('Senha').props.value).toBe('');
  authenticate.mockRestore();
});
