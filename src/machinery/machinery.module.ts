import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machinery } from './machinery.entity';
import { MachineryController } from './machinery.controller';
import { MachineryService } from './machinery.service';
import { Farm } from 'src/farm/farm.entity';
import { FieldCultivation } from 'src/field-cultivation/field-cultivation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Machinery, Farm, FieldCultivation])],
  controllers: [MachineryController],
  providers: [MachineryService],
  exports: [MachineryService],
})
export class MachineryModule {}
