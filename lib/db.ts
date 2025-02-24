import { PrismaClient } from '@prisma/client';

declare global {
  // 型の拡張を行い、グローバル変数を宣言
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // デバッグ用ログ
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
