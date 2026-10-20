import type { LoginValues } from '@/forms/loginSchema';

export interface MockSession {
  username: string;
  mode: 'mock';
}

// Credenciais públicas de demonstração, sem acesso a qualquer serviço real.
export async function authenticateMock({ username, password }: LoginValues): Promise<MockSession> {
  await new Promise<void>((resolve) => setTimeout(resolve, 500));
  if (username !== 'demo' || password !== 'Leitura123!') {
    throw new Error('Usuário ou senha inválidos.');
  }
  return { username, mode: 'mock' };
}
