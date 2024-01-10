import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cultivation } from './cultivation.entity';
import { CultivationController } from './cultivation.controller';
import { CultivationService } from './cultivation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cultivation])],
  controllers: [CultivationController],
  providers: [CultivationService],
})
export class CultivationModule {}
