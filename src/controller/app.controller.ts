import { Controller, Get } from '@nestjs/common';

import { AppService } from '../service';

@Controller('app')
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get('helloWorld')
   async getHelloWorld(): Promise<string> {
      return this.appService.helloWorld();
   }
}
