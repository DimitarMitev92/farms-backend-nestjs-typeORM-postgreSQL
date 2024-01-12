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
  NotFoundException,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { Farm } from './farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';

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
  async create(@Body() createFarmDto: CreateFarmDto): Promise<Farm> {
    try {
      return await this.farmService.create(createFarmDto);
    } catch (error: any) {
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
    @Body() updateFarmDto: Partial<CreateFarmDto>,
  ): Promise<Farm> {
    try {
      return await this.farmService.update(id, updateFarmDto);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new BadRequestException('An unknown error occurred');
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.farmService.remove(id);
  }
}
