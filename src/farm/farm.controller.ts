import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { Farm } from './farm.entity';

@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Get()
  findAll(): Promise<Farm[]> {
    return this.farmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Farm> {
    return this.farmService.findOne(id);
  }

  @Post()
  create(@Body() farm: Farm): Promise<Farm> {
    return this.farmService.create(farm);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() farm: Farm): Promise<Farm> {
    return this.farmService.update(id, farm);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.farmService.remove(id);
  }
}
