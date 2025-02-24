import { PrismaClient } from '@prisma/client';

declare global {
  // `globalThis` に `prisma` を追加する
  namespace globalThis {
    var prisma: PrismaClient | undefined;
  }
}

// `globalThis.prisma` を使って Prisma Client のインスタンスを保持
export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

// `production` 環境ではインスタンスをキャッシュしない
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
