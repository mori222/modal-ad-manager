import { PrismaClient } from '@prisma/client';

// `globalThis.prisma` を使って Prisma Client のインスタンスを管理
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
};

// `production` 環境ではキャッシュしない
export const prisma =
  (globalThis as unknown as { prisma: PrismaClient }).prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  (globalThis as unknown as { prisma: PrismaClient }).prisma = prisma;
}
