import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './crop.entity';
import { CropController } from './crop.controller';
import { CropService } from './crop.service';

@Module({
  imports: [TypeOrmModule.forFeature([Crop])],
  controllers: [CropController],
  providers: [CropService],
})
export class CropModule {}
