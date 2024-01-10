import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soil } from './soil.entity';
import { SoilController } from './soil.controller';
import { SoilService } from './soil.service';

@Module({
  imports: [TypeOrmModule.forFeature([Soil])],
  controllers: [SoilController],
  providers: [SoilService],
})
export class SoilModule {}
