export type ApiConfig = { baseUrl: string | null };

export function resolveApiConfig(value: string | undefined): ApiConfig {
  if (!value?.trim()) return { baseUrl: null };
  const url = new URL(value.trim());
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('EXPO_PUBLIC_API_URL deve ser uma URL HTTP(S) sem credenciais.');
  }
  return { baseUrl: url.toString().replace(/\/$/, '') };
}

// Configuração apenas. Cliente HTTP e contratos dependem das próximas specs.
export function getApiConfig(): ApiConfig {
  return resolveApiConfig(process.env.EXPO_PUBLIC_API_URL);
}
