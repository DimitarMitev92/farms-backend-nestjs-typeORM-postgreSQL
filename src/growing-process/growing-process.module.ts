import { Module } from '@nestjs/common';
import { GrowingProcessController } from './growing-process.controller';
import { GrowingProcessService } from './growing-process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrowingProcess } from './growing-process.entity';
import { Field } from 'src/field/field.entity';
import { Crop } from 'src/crop/crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrowingProcess, Field, Crop])],
  controllers: [GrowingProcessController],
  providers: [GrowingProcessService],
})
export class GrowingProcessModule {}
