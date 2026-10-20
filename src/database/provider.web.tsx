import type { ReactNode } from 'react';

// Prévia da interface sem carregar SQLite/WASM ou simular persistência.
export function DatabaseProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
