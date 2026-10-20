import type { SQLiteDatabase } from 'expo-sqlite';
import { migrateDatabase } from '../src/database/migrations';

function database(version: number) {
  const transaction = {
    getFirstAsync: jest.fn().mockResolvedValue({ user_version: version }),
    execAsync: jest.fn(),
  };
  return {
    transaction,
    db: {
      withExclusiveTransactionAsync: jest.fn(async (callback) => callback(transaction)),
    } as unknown as SQLiteDatabase,
  };
}

test('banco inicial não cria tabelas de negócio', async () => {
  const { db, transaction } = database(0);
  await migrateDatabase(db);
  expect(db.withExclusiveTransactionAsync).toHaveBeenCalledTimes(1);
  expect(transaction.execAsync).not.toHaveBeenCalled();
});

test('recusa banco de versão futura sem alterá-lo', async () => {
  const { db, transaction } = database(1);
  await expect(migrateDatabase(db)).rejects.toThrow('versão mais recente');
  expect(transaction.execAsync).not.toHaveBeenCalled();
});
