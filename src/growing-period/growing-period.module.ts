import { Module } from '@nestjs/common';
import { GrowingPeriodController } from './growing-period.controller';
import { GrowingPeriodService } from './growing-period.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrowingPeriod } from './growing-period.entity';
import { Field } from 'src/field/field.entity';
import { Crop } from 'src/crop/crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrowingPeriod, Field, Crop])],
  controllers: [GrowingPeriodController],
  providers: [GrowingPeriodService],
})
export class GrowingPeriodModule {}
