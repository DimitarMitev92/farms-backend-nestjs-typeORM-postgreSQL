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
  create(@Body() createFarmDto: CreateFarmDto): Promise<Farm> {
    const farm: Farm = {
      name: createFarmDto.name,
      location: createFarmDto.location,
      userId: createFarmDto.userId,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };

    return this.farmService.create(farm);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedFarmDto: Partial<CreateFarmDto>,
  ): Promise<Partial<Farm>> {
    return this.farmService.update(id, updatedFarmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.farmService.remove(id);
  }
}
