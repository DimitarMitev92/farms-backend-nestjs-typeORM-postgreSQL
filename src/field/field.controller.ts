import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FieldService } from './field.service';
import { Field } from './field.entity';

@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Get()
  findAll(): Promise<Field[]> {
    return this.fieldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Field> {
    return this.fieldService.findOne(id);
  }

  @Post()
  create(@Body() field: Field): Promise<Field> {
    return this.fieldService.create(field);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() field: Field): Promise<Field> {
    return this.fieldService.update(id, field);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.fieldService.remove(id);
  }
}
