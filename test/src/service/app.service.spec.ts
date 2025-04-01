import { Test } from '@nestjs/testing';

import { AppService } from '../../../src/service';

describe('AppService', () => {
   let service: AppService;

   beforeEach(async () => {
      const module = await Test.createTestingModule({
         providers: [AppService],
      }).compile();

      service = module.get<AppService>(AppService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });

   describe('helloWorld', () => {
      it('should return "Hello World!"', () => {
         expect(service.helloWorld()).toBe('Hello World!');
      });
   });
});
