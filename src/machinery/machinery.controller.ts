import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MachineryService } from './machinery.service';
import { Machinery } from './machinery.entity';
import { CreateMachineryDto } from './dto/create-machinery.dto';

@Controller('machinery')
export class MachineryController {
  constructor(private readonly machineryService: MachineryService) {}

  @Get()
  findAll(): Promise<Machinery[]> {
    return this.machineryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Machinery> {
    return this.machineryService.findOne(id);
  }

  @Post()
  create(@Body() createMachineryDto: CreateMachineryDto): Promise<Machinery> {
    return this.machineryService.create(createMachineryDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createMachineryDto: CreateMachineryDto,
  ): Promise<Machinery> {
    return this.machineryService.update(id, createMachineryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.machineryService.remove(id);
  }
}
