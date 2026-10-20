import type { ReactNode } from 'react';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './initialize';

export function DatabaseProvider({ children }: { children: ReactNode }) {
  return (
    <SQLiteProvider databaseName="leitura-facil.db" onInit={initializeDatabase}>
      {children}
    </SQLiteProvider>
  );
}
