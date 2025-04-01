import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { JwtAuthGuard } from './guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
   imports: [ConfigModule, PassportModule.register({ defaultStrategy: 'jwt' })],
   providers: [
      JwtStrategy,
      {
         provide: APP_GUARD,
         useClass: JwtAuthGuard,
      },
   ],
   exports: [PassportModule],
})
export class AuthzModule {}
