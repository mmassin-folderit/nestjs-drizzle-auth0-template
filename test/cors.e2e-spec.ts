import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { createNestApp } from '../src/create-app';

describe('CORS Configuration (e2e)', () => {
   let app: INestApplication;
   const PORT = 3002;

   beforeAll(async () => {
      process.env.ALLOWED_ORIGINS = 'https://allowed-origin.com';
      process.env.PORT = `${PORT}`;

      app = await createNestApp();
      await app.listen(PORT);
   });

   afterAll(async () => {
      await app.close();
   });

   it('should allow requests from allowed origins', () => {
      const allowedOrigin = 'https://allowed-origin.com';
      return request(app.getHttpServer())
         .get('/health')
         .set('Origin', allowedOrigin)
         .expect('Access-Control-Allow-Origin', allowedOrigin)
         .expect(200);
   });

   it('should reject requests from disallowed origins', () => {
      const disallowedOrigin = 'https://disallowed-origin.com';
      return request(app.getHttpServer())
         .get('/health')
         .set('Origin', disallowedOrigin)
         .expect((res) => {
            expect(res.headers['access-control-allow-origin']).toBeFalsy();
         })
         .expect(200);
   });

   it('should handle requests without Origin header', () => {
      return request(app.getHttpServer())
         .get('/health')
         .expect((res) => {
            expect(res.headers['access-control-allow-origin']).toBeFalsy();
         })
         .expect(200);
   });
});
