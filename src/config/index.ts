import * as process from 'node:process';

import { Logger } from '@nestjs/common';

import { Config } from '../types';

const env = process.env;

export default (): Config => ({
   port: parseInt(readEnvironmentVariable('PORT', false)) || 3000,
   auth0: {
      issuerUrl: readEnvironmentVariable('AUTH0_ISSUER_URL', false),
      audience: readEnvironmentVariable('AUTH0_AUDIENCE', false),
   },
   database: {
      host: readEnvironmentVariable('DATABASE_HOST'),
      port: parseInt(readEnvironmentVariable('DATABASE_PORT'), 10),
      database: readEnvironmentVariable('DATABASE_NAME'),
      user: readEnvironmentVariable('DATABASE_USER'),
      password: readEnvironmentVariable('DATABASE_PASSWORD'),
   },
});

const readEnvironmentVariable = (key: string, required = true): string => {
   const value = env[key];
   if (!value && required) {
      const logger = new Logger('Config');
      logger.error(`Missing required environment variable: ${key}`);
      process.exit(1);
   }
   return value!;
};
