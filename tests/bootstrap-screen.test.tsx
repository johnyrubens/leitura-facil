import { render, screen } from '@testing-library/react-native';
import BootstrapScreen from '../app/home';
import { useSessionStore } from '../src/stores/session';

test('Home provisória exibe a identificação e permite sair', async () => {
  useSessionStore.getState().signIn({ username: 'demo', mode: 'mock' });
  await render(<BootstrapScreen />);
  expect(screen.getByRole('header', { name: 'Leitura Fácil' })).toBeOnTheScreen();
  expect(screen.getByText('Home provisória — ambiente de demonstração.')).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Sair' })).toBeOnTheScreen();
});
