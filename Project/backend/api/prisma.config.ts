import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

// Configuration for Prisma Migrate
export default defineConfig({
  datasource: {
    url: env('DATABASE_URL'),
  },
});

// Configuration for PrismaClient
export const clientConfig = {
  // Standard Prisma Client configuration
  // The DATABASE_URL is read from the schema file
};

