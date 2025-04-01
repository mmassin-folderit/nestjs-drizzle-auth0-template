import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult, HealthCheckService } from '@nestjs/terminus';

import { Public } from '../../authz';

@Controller('health')
export class HealthController {
   constructor(private health: HealthCheckService) {}

   @Get()
   @Public()
   @HealthCheck()
   check(): Promise<HealthCheckResult> {
      return this.health.check([]);
   }
}
