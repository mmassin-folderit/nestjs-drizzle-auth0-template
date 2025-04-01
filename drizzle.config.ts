import { defineConfig } from 'drizzle-kit';

const env = process.env;

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema',
  out: './drizzle',
  dbCredentials: {
    host: env.DATABASE_HOST || 'localhost',
    port: env.DATABASE_PORT ? parseInt(env.DATABASE_PORT, 10) : 5432,
    user: env.DATABASE_USER || 'postgres',
    password: env.DATABASE_PASSWORD || 'postgres',
    database: env.DATABASE_NAME || 'ticketing',
    ssl: false,
  },
});

