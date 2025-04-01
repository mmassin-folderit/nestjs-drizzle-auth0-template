import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppController } from '../../../src/controller';
import { AppService } from '../../../src/service';

describe('AppController', () => {
   let app: INestApplication;
   let appServiceMock: AppService;

   beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
         controllers: [AppController],
         providers: [
            {
               provide: AppService,
               useValue: {
                  helloWorld: jest.fn(),
               },
            },
         ],
      }).compile();

      app = moduleFixture.createNestApplication();
      appServiceMock = moduleFixture.get<AppService>(AppService);
      await app.init();
   });

   afterAll(async () => {
      await app.close();
   });

   describe('GET /helloWorld', () => {
      it('should call `AppService`', async () => {
         jest.spyOn(appServiceMock, 'helloWorld').mockReturnValue('Hello World!');
         await request(app.getHttpServer())
            .get('/app/helloWorld')
            .expect(200)
            .expect('Hello World!');

         expect(appServiceMock.helloWorld).toHaveBeenCalled();
      });
   });
});
