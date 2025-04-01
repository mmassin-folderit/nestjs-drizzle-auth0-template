import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Config, JwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(configService: ConfigService<Config>) {
      super({
         secretOrKeyProvider: passportJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `${configService.get('auth0').issuerUrl}.well-known/jwks.json`,
         }),

         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         audience: configService.get('auth0').audience,
         issuer: configService.get('auth0').issuerUrl,
         algorithms: ['RS256'],
      });
   }

   validate(payload: JwtPayload): JwtPayload {
      return payload;
   }
}
