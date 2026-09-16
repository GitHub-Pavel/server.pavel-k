import { Prisma } from './.generated/client'; 
import { AsyncLocalStorage } from 'node:async_hooks';
import { PrismaService } from './prisma.service';

const storage = new AsyncLocalStorage<Prisma.TransactionClient | undefined>();
const contextSymbol = Symbol('TransactionStart');

export const getTransactionManager = () => storage.getStore();

/**
 * Запустить функцию в рамках существующей транзакции или создать новую
 * @param prismaService — Экземпляр вашего PrismaService
 * @param fn — Обернутая функция
 */
export const runInTransaction = <T>(
  prismaService: PrismaService,
  fn: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> => {
  const existingTransaction = storage.getStore();
  
  if (existingTransaction) {
    return fn(existingTransaction);
  }

  return prismaService.client.$transaction(async (tx) => {
    (tx as any)[contextSymbol] = Date.now();
    try {
      return await storage.run(tx, () => fn(tx));
    } finally {
      storage.run(undefined, () => {});
    }
  });
};

export const conditionalTransaction = <T>(
  prismaService: PrismaService,
  fn: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> => {
  const transactionClient = storage.getStore();
  return fn(transactionClient || (prismaService.client as any));
};

export type StartTransaction = <T>(fn: (tx: Prisma.TransactionClient) => Promise<T>) => Promise<T>;
export const StartTransaction = Symbol('StartTransaction');
