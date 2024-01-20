import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { SoilService } from './soil.service';
import { Soil } from './soil.entity';
import { CreateSoilDto } from './dto/create-soul.dto';

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
  create(@Body() createSoilDto: CreateSoilDto): Promise<Soil> {
    return this.soilService.create(createSoilDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSoilDto: CreateSoilDto,
  ): Promise<Soil> {
    return this.soilService.update(id, updateSoilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.soilService.remove(id);
  }

  @Delete('perm-delete/:id')
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.soilService.permDelete(id);
  }
}
