import { Module } from '@nestjs/common';
import { ReportingController } from './reporting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineryService } from 'src/machinery/machinery.service';
import { Machinery } from 'src/machinery/machinery.entity';
import { Farm } from 'src/farm/farm.entity';
import { FieldCultivation } from 'src/field-cultivation/field-cultivation.entity';
import { FieldService } from 'src/field/field.service';
import { Field } from 'src/field/field.entity';
import { Soil } from 'src/soil/soil.entity';
import { FarmService } from 'src/farm/farm.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Machinery,
      Farm,
      FieldCultivation,
      Field,
      Soil,
      Farm,
    ]),
  ],
  controllers: [ReportingController],
  providers: [MachineryService, FieldService, FarmService],
})
export class ReportingModule {}
