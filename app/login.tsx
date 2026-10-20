import { AppButton, AppCheckbox, AppInput, AppScreen, AppText } from '@/components/ui';
import { loginSchema, type LoginValues } from '@/forms/loginSchema';
import { authenticateMock } from '@/services/auth/mockAuthService';
import { useSessionStore } from '@/stores/session';
import { theme } from '@/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import Constants from 'expo-constants';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Keyboard, StyleSheet, View } from 'react-native';

export default function LoginScreen() {
  const signIn = useSessionStore((state) => state.signIn);
  const pending = useRef(false);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });
  const submit = handleSubmit(async (values) => {
    Keyboard.dismiss();
    clearErrors('root');
    try {
      const session = await authenticateMock(values);
      resetField('password');
      signIn(session);
    } catch {
      setError('root', { message: 'Usuário ou senha inválidos. Tente novamente.' });
    }
  });
  // A trava síncrona cobre também os envios antes do próximo render do formulário.
  const onSubmit = async () => {
    if (pending.current) return;
    pending.current = true;
    try {
      await submit();
    } finally {
      pending.current = false;
    }
  };

  return (
    <AppScreen scrollable background="white" contentContainerStyle={styles.screen}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/login-leitura-facil.png')}
          resizeMode="contain"
          style={styles.header}
          accessible
          accessibilityLabel="Leitura Fácil — Água e Gás. Mais eficiência na leitura dos seus medidores."
        />
        <View style={styles.form}>
          <AppText variant="headingXL" align="center" accessibilityRole="header">
            Acesse sua conta
          </AppText>
          <AppText color="neutral600" align="center">
            Entre com seus dados para continuar
          </AppText>
          <Controller
            control={control}
            name="username"
            render={({ field: { value, onChange, onBlur } }) => (
              <AppInput
                label="Usuário"
                leftIcon="person"
                placeholder="Usuário"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.username?.message}
                disabled={isSubmitting}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="username"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <AppInput
                label="Senha"
                leftIcon="lock"
                placeholder="Senha"
                type="password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                disabled={isSubmitting}
                autoComplete="current-password"
                returnKeyType="go"
                onSubmitEditing={() => void onSubmit()}
              />
            )}
          />
          <AppCheckbox label="Lembrar meu usuário" checked={false} onChange={() => {}} disabled />
          <AppButton label="Esqueci minha senha" variant="secondary" disabled />
          {errors.root?.message && (
            <AppText color="danger500" accessibilityRole="alert" accessibilityLiveRegion="polite">
              {errors.root.message}
            </AppText>
          )}
          <AppButton label="Entrar" loading={isSubmitting} onPress={() => void onSubmit()} />
          <AppText variant="caption" align="center" color="neutral600">
            Ou entre com
          </AppText>
          <AppButton label="Entrar com biometria" variant="outline" disabled />
          <AppText variant="caption" color="neutral600">
            Lembrar usuário, recuperação de senha e biometria indisponíveis nesta versão.
          </AppText>
          <AppText variant="caption" color="neutral600" align="center">
            Ambiente de demonstração — autenticação simulada.1
          </AppText>
          <AppText variant="caption" color="neutral600" align="center">
            Versão {Constants.expoConfig?.version ?? '1.0.0'}
          </AppText>
        </View>
      </View>
    </AppScreen>
  );
}
const styles = StyleSheet.create({
  screen: { alignItems: 'center', padding: 0, gap: 0 },
  content: {
    width: '100%',
    maxWidth: 412,
    backgroundColor: theme.colors.white,
  },
  // Dimensões reais do PNG local; a altura acompanha a largura disponível.
  header: { width: '100%', aspectRatio: 412 / 262.73 },
  form: { padding: theme.spacing.lg, gap: theme.spacing.md, backgroundColor: theme.colors.white },
});
