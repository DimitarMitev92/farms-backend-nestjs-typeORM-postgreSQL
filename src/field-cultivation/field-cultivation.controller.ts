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
import { UserRights } from 'src/user/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('field-cultivation')
export class FieldCultivationController {
  constructor(
    private readonly fieldCultivationService: FieldCultivationService,
  ) {}

  @Get()
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findAll(): Promise<FieldCultivation[]> {
    return this.fieldCultivationService.findAll();
  }

  @Get(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findOne(@Param('id') id: string): Promise<FieldCultivation> {
    return this.fieldCultivationService.findOne(id);
  }

  @Get('update/:id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findOneForUpdate(@Param('id') id: string): Promise<FieldCultivation> {
    return this.fieldCultivationService.findOneForUpdate(id);
  }

  @Post()
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
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
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  update(
    @Param('id') id: string,
    @Body() updateFieldCultivationDto: Partial<FieldCultivation>,
  ): Promise<Partial<FieldCultivation>> {
    return this.fieldCultivationService.update(id, updateFieldCultivationDto);
  }

  @Delete(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.fieldCultivationService.remove(id);
  }

  @Delete('perm-delete/:id')
  @Roles([UserRights.OWNER])
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.fieldCultivationService.permDelete(id);
  }
}
