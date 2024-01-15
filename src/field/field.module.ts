import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './field.entity';
import { FieldController } from './field.controller';
import { FieldService } from './field.service';
import { Soil } from 'src/soil/soil.entity';
import { Farm } from 'src/farm/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Field, Soil, Farm])],
  controllers: [FieldController],
  providers: [FieldService],
})
export class FieldModule {}
