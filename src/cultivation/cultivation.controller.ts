import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  ParseUUIDPipe,
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
  async create(
    @Body() createCultivationDto: CreateCultivationDto,
  ): Promise<Cultivation> {
    try {
      return await this.cultivationService.create(createCultivationDto);
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
    @Body() updateCultivationDto: CreateCultivationDto,
  ): Promise<Cultivation> {
    try {
      return await this.cultivationService.update(id, updateCultivationDto);
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
    return this.cultivationService.remove(id);
  }
}
