import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from './farm.entity';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';
import { Field } from 'src/field/field.entity';
import { Machinery } from 'src/machinery/machinery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Field, Machinery])],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
