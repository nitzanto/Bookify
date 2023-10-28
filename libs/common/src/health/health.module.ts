import { Module } from '@nestjs/common';
import { HealthController } from '@app/common/health/health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
