import { ConfigService } from '@nestjs/config';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { Config, DatabaseConfig } from '../../types';
import * as schema from '../schema';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const DrizzleProvider = [
   {
      provide: DrizzleAsyncProvider,
      inject: [ConfigService],
      useFactory: async (config: ConfigService<Config>) => {
         const dbConfig = config.get<DatabaseConfig>('database');
         if (!dbConfig) {
            throw new Error('Database configuration is not defined');
         }

         const pool = new Pool({
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database,
            ssl: false,
         });

         return drizzle(pool, { schema, casing: 'snake_case' }) as NodePgDatabase<typeof schema>;
      },
   },
];
