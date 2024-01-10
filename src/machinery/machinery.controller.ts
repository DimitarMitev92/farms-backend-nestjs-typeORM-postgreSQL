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
  create(@Body() machinery: Machinery): Promise<Machinery> {
    return this.machineryService.create(machinery);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() machinery: Machinery,
  ): Promise<Machinery> {
    return this.machineryService.update(id, machinery);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.machineryService.remove(id);
  }
}
