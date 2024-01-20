import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { FieldService } from './field.service';
import { Field } from './field.entity';
import { CreateFieldDto } from './dto/create-field.dto';

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
  create(@Body() createFieldDto: Partial<CreateFieldDto>): Promise<Field> {
    const field: Field = {
      name: createFieldDto.name,
      boundaries: createFieldDto.boundaries,
      soilId: createFieldDto.soilId,
      farmId: createFieldDto.farmId,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };

    return this.fieldService.create(field);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFieldDto: Partial<CreateFieldDto>,
  ): Promise<Partial<Field>> {
    return this.fieldService.update(id, updateFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.fieldService.remove(id);
  }

  @Delete('perm-delete/:id')
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.fieldService.permDelete(id);
  }
}
