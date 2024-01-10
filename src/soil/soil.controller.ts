import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SoilService } from './soil.service';
import { Soil } from './soil.entity';

@Controller('soil')
export class SoilController {
  constructor(private readonly soilService: SoilService) {}

  @Get()
  findAll(): Promise<Soil[]> {
    return this.soilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Soil> {
    return this.soilService.findOne(id);
  }

  @Post()
  create(@Body() soil: Soil): Promise<Soil> {
    return this.soilService.create(soil);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() soil: Soil): Promise<Soil> {
    return this.soilService.update(id, soil);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.soilService.remove(id);
  }
}
