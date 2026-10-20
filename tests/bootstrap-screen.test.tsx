import { render, screen } from '@testing-library/react-native';
import BootstrapScreen from '../app/index';

test('Home provisória exibe a identificação e permite sair', async () => {
  await render(<BootstrapScreen />);
  expect(screen.getByRole('header', { name: 'Leitura Fácil' })).toBeOnTheScreen();
  expect(screen.getByText('Home provisória — ambiente de demonstração.')).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Sair' })).toBeOnTheScreen();
});
