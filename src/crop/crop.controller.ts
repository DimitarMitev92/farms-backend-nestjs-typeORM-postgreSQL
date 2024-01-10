import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CropService } from './crop.service';
import { Crop } from './crop.entity';

@Controller('crop')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Get()
  findAll(): Promise<Crop[]> {
    return this.cropService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Crop> {
    return this.cropService.findOne(id);
  }

  @Post()
  create(@Body() crop: Crop): Promise<Crop> {
    return this.cropService.create(crop);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() crop: Crop): Promise<Crop> {
    return this.cropService.update(id, crop);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cropService.remove(id);
  }
}
