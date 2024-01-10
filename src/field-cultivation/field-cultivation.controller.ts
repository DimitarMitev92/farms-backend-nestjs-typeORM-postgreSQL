import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FieldCultivationService } from './field-cultivation.service';
import { FieldCultivation } from './field-cultivation.entity';

@Controller('cultivation')
export class FieldCultivationController {
  constructor(
    private readonly fieldCultivationService: FieldCultivationService,
  ) {}

  @Get()
  findAll(): Promise<FieldCultivation[]> {
    return this.fieldCultivationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FieldCultivation> {
    return this.fieldCultivationService.findOne(id);
  }

  @Post()
  create(@Body() cultivation: FieldCultivation): Promise<FieldCultivation> {
    return this.fieldCultivationService.create(cultivation);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() cultivation: FieldCultivation,
  ): Promise<FieldCultivation> {
    return this.fieldCultivationService.update(id, cultivation);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.fieldCultivationService.remove(id);
  }
}
