import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CultivationService } from './cultivation.service';
import { Cultivation } from './cultivation.entity';

@Controller('cultivation')
export class CultivationController {
  constructor(private readonly cultivationService: CultivationService) {}

  @Get()
  findAll(): Promise<Cultivation[]> {
    return this.cultivationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cultivation> {
    return this.cultivationService.findOne(id);
  }

  @Post()
  create(@Body() cultivation: Cultivation): Promise<Cultivation> {
    return this.cultivationService.create(cultivation);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() cultivation: Cultivation,
  ): Promise<Cultivation> {
    return this.cultivationService.update(id, cultivation);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cultivationService.remove(id);
  }
}
