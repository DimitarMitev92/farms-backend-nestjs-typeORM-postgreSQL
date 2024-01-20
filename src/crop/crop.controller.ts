import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { CropService } from './crop.service';
import { Crop } from './crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';

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
  create(@Body() createCropDto: CreateCropDto): Promise<Crop> {
    return this.cropService.create(createCropDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedCropDto: CreateCropDto,
  ): Promise<Crop> {
    return this.cropService.update(id, updatedCropDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.cropService.remove(id);
  }

  @Delete('perm-delete/:id')
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.cropService.permDelete(id);
  }
}
