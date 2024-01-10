import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machinery } from './machinery.entity';
import { MachineryController } from './machinery.controller';
import { MachineryService } from './machinery.service';

@Module({
  imports: [TypeOrmModule.forFeature([Machinery])],
  controllers: [MachineryController],
  providers: [MachineryService],
})
export class MachineryModule {}
