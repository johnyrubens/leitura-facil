import { fireEvent, render, screen } from '@testing-library/react-native';
import {
  AppButton,
  AppCheckbox,
  AppInput,
  AppScreen,
  AppCard,
  AppText,
} from '../src/components/ui';

test('senha inicia oculta e permite alternância sem alterar valor', () => {
  const change = jest.fn();
  render(<AppInput label="Senha" type="password" value="exemplo" onChangeText={change} />);
  expect(screen.getByLabelText('Senha').props.secureTextEntry).toBe(true);
  fireEvent.press(screen.getByRole('button', { name: 'Mostrar senha' }));
  expect(screen.getByLabelText('Senha').props.secureTextEntry).toBe(false);
  fireEvent.press(screen.getByRole('button', { name: 'Ocultar senha' }));
  expect(screen.getByLabelText('Senha').props.secureTextEntry).toBe(true);
  expect(change).not.toHaveBeenCalled();
});

test('campo encaminha edição e foco e comunica erro e desabilitado', () => {
  const change = jest.fn();
  const blur = jest.fn();
  const focus = jest.fn();
  const { rerender } = render(
    <AppInput
      label="E-mail"
      type="email"
      value=""
      onChangeText={change}
      onFocus={focus}
      onBlur={blur}
      error="Informe um e-mail válido."
    />,
  );
  const input = screen.getByLabelText('E-mail');
  expect(input.props.keyboardType).toBe('email-address');
  fireEvent.changeText(input, 'a@b.com');
  fireEvent(input, 'focus', { nativeEvent: {} });
  fireEvent(input, 'blur', { nativeEvent: {} });
  expect(change).toHaveBeenCalledWith('a@b.com');
  expect(focus).toHaveBeenCalledTimes(1);
  expect(blur).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('alert')).toHaveTextContent('Informe um e-mail válido.');
  rerender(<AppInput label="E-mail" value="" disabled onChangeText={change} />);
  expect(screen.getByLabelText('E-mail').props.editable).toBe(false);
});

test('botão bloqueia acionamento durante loading e desabilitado', () => {
  const press = jest.fn();
  const { rerender } = render(<AppButton label="Salvar" loading onPress={press} />);
  fireEvent.press(screen.getByRole('button'));
  expect(press).not.toHaveBeenCalled();
  expect(screen.getByRole('button').props.accessibilityState.busy).toBe(true);
  rerender(<AppButton label="Salvar" disabled onPress={press} />);
  fireEvent.press(screen.getByRole('button'));
  expect(press).not.toHaveBeenCalled();
  rerender(<AppButton label="Salvar" onPress={press} />);
  fireEvent.press(screen.getByRole('button'));
  expect(press).toHaveBeenCalledTimes(1);
});

test('checkbox mantém controle do pai e respeita desabilitado', () => {
  const change = jest.fn();
  const { rerender } = render(<AppCheckbox label="Selecionar" checked={false} onChange={change} />);
  fireEvent.press(screen.getByRole('checkbox'));
  expect(change).toHaveBeenCalledWith(true);
  expect(screen.getByRole('checkbox').props.accessibilityState.checked).toBe(false);
  rerender(<AppCheckbox label="Selecionar" checked disabled onChange={change} />);
  fireEvent.press(screen.getByRole('checkbox'));
  expect(change).toHaveBeenCalledTimes(1);
});

test('contêineres e texto independem de navegação e autenticação', () => {
  render(
    <AppScreen scrollable>
      <AppCard>
        <AppText variant="readingNumber">123</AppText>
      </AppCard>
    </AppScreen>,
  );
  expect(screen.getByText('123')).toBeOnTheScreen();
});
