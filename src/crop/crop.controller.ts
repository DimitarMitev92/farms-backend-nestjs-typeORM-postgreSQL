import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  BadRequestException,
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
  async create(@Body() createCropDto: CreateCropDto): Promise<Crop> {
    try {
      return await this.cropService.create(createCropDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('An unknown error occurred');
      }
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updatedCropDto: CreateCropDto,
  ): Promise<Crop> {
    try {
      return await this.cropService.update(id, updatedCropDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('An unknown error occurred');
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cropService.remove(id);
  }
}
