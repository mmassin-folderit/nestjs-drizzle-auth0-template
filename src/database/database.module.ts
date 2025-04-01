import { Module } from '@nestjs/common';

import { DrizzleAsyncProvider, DrizzleProvider } from './Drizzle/drizzle.provider';

@Module({
   providers: [...DrizzleProvider],
   exports: [DrizzleAsyncProvider],
})
export class DatabaseModule {}
