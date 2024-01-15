import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldCultivation } from './field-cultivation.entity';
import { FieldCultivationController } from './field-cultivation.controller';
import { FieldCultivationService } from './field-cultivation.service';
import { Cultivation } from 'src/cultivation/cultivation.entity';
import { Machinery } from 'src/machinery/machinery.entity';
import { GrowingPeriod } from 'src/growing-period/growing-period.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FieldCultivation,
      Cultivation,
      Machinery,
      GrowingPeriod,
    ]),
  ],
  controllers: [FieldCultivationController],
  providers: [FieldCultivationService],
})
export class FieldCultivationModule {}
