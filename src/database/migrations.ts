import type { SQLiteDatabase } from 'expo-sqlite';

export type Migration = {
  version: number;
  up: (database: SQLiteDatabase) => Promise<void>;
};

// Adicionar apenas migrações aprovadas; nenhuma tabela de negócio em BOOT-001.
export const migrations: readonly Migration[] = [];

export async function migrateDatabase(database: SQLiteDatabase): Promise<void> {
  await database.withExclusiveTransactionAsync(async (transaction) => {
    const row = await transaction.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
    let version = row?.user_version ?? 0;
    const latestVersion = migrations.at(-1)?.version ?? 0;
    if (version > latestVersion) {
      throw new Error('Banco criado por uma versão mais recente do aplicativo.');
    }
    for (const migration of migrations) {
      if (migration.version <= version) continue;
      if (!Number.isInteger(migration.version) || migration.version !== version + 1) {
        throw new Error('Sequência de migrações inválida.');
      }
      await migration.up(transaction);
      await transaction.execAsync(`PRAGMA user_version = ${migration.version}`);
      version = migration.version;
    }
  });
}
