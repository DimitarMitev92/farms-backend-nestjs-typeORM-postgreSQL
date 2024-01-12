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
import { CreateCultivationDto } from './dto/create-cultivation.dto';

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
  create(
    @Body() createCultivationDto: CreateCultivationDto,
  ): Promise<Cultivation> {
    return this.cultivationService.create(createCultivationDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCultivationDto: CreateCultivationDto,
  ): Promise<Cultivation> {
    return this.cultivationService.update(id, updateCultivationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cultivationService.remove(id);
  }
}
