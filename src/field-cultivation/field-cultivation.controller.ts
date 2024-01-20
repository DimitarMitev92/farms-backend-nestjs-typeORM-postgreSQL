import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { FieldCultivationService } from './field-cultivation.service';
import { FieldCultivation } from './field-cultivation.entity';
import { CreateFieldCultivationDto } from './dto/create-field-cultivation.dto';

@Controller('field-cultivation')
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
  create(
    @Body() createFieldCultivationDto: Partial<CreateFieldCultivationDto>,
  ): Promise<FieldCultivation> {
    const fieldCultivation: FieldCultivation = {
      startingDate: createFieldCultivationDto.startingDate,
      cultivationId: createFieldCultivationDto.cultivationId,
      machineryId: createFieldCultivationDto.machineryId,
      growingProcessId: createFieldCultivationDto.growingProcessId,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };

    return this.fieldCultivationService.create(fieldCultivation);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFieldCultivationDto: Partial<FieldCultivation>,
  ): Promise<Partial<FieldCultivation>> {
    return this.fieldCultivationService.update(id, updateFieldCultivationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.fieldCultivationService.remove(id);
  }

  @Delete('perm-delete/:id')
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.fieldCultivationService.permDelete(id);
  }
}
