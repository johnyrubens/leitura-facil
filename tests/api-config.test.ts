import { resolveApiConfig } from '../src/api/config';

test('API permanece desabilitada sem configuração', () => {
  expect(resolveApiConfig(undefined)).toEqual({ baseUrl: null });
  expect(resolveApiConfig(' ')).toEqual({ baseUrl: null });
});

test('normaliza URL pública e rejeita credenciais e protocolos incompatíveis', () => {
  expect(resolveApiConfig(' https://example.com/ ').baseUrl).toBe('https://example.com');
  expect(() => resolveApiConfig('https://user:password@example.com')).toThrow();
  expect(() => resolveApiConfig('file:///tmp')).toThrow();
  expect(() => resolveApiConfig('inválida')).toThrow();
});
