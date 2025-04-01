import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthzModule } from './authz/authz.module';
import config from './config';
import { CONTROLLERS } from './controller';
import { DatabaseModule } from './database';
import { HealthModule } from './health';
import { SERVICES } from './service';

@Module({
   imports: [
      ConfigModule.forRoot({
         load: [config],
      }),
      HealthModule,
      DatabaseModule,
      AuthzModule,
   ],
   controllers: [...CONTROLLERS],
   providers: [...SERVICES],
})
export class AppModule {}
