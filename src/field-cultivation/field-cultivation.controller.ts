import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { FieldCultivationService } from './field-cultivation.service';
import { FieldCultivation } from './field-cultivation.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRightsDec } from 'src/auth/user-rights.decorator';
import { UserRights } from 'src/user/user.entity';
import { CreateFieldCultivationDto } from './dto/create-field-cultivation.dto';

@Controller('field-cultivation')
export class FieldCultivationController {
  constructor(
    private readonly fieldCultivationService: FieldCultivationService,
  ) {}

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get()
  findAll(): Promise<FieldCultivation[]> {
    return this.fieldCultivationService.findAll();
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<FieldCultivation> {
    return this.fieldCultivationService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
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

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFieldCultivationDto: Partial<FieldCultivation>,
  ): Promise<Partial<FieldCultivation>> {
    return this.fieldCultivationService.update(id, updateFieldCultivationDto);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.fieldCultivationService.remove(id);
  }
}
