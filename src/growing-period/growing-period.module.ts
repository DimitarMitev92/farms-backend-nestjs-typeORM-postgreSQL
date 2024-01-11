import { Module } from '@nestjs/common';
import { GrowingPeriodController } from './growing-period.controller';
import { GrowingPeriodService } from './growing-period.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrowingPeriod } from './growing-period.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrowingPeriod])],
  controllers: [GrowingPeriodController],
  providers: [GrowingPeriodService],
})
export class GrowingPeriodModule {}
