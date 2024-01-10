import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldCultivation } from './field-cultivation.entity';
import { FieldCultivationController } from './field-cultivation.controller';
import { FieldCultivationService } from './field-cultivation.service';

@Module({
  imports: [TypeOrmModule.forFeature([FieldCultivation])],
  controllers: [FieldCultivationController],
  providers: [FieldCultivationService],
})
export class FieldCultivationModule {}
