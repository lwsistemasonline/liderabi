import { PrismaClient } from '../../generated/prisma';
import dotenv from 'dotenv';
import { clientConfig } from '../../prisma.config';

dotenv.config();

const prismaClientSingleton = () => {
  return new PrismaClient({
    ...clientConfig,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

