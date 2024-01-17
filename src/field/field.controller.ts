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
import { FieldService } from './field.service';
import { Field } from './field.entity';
import { CreateFieldDto } from './dto/create-field.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRightsDec } from 'src/auth/user-rights.decorator';
import { UserRights } from 'src/user/user.entity';
import { FieldCountDto } from './dto/field-count.dto';
import { FieldSoilDto } from './dto/field-soil.dto';

@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get('count')
  getFieldCountByFarmAndCrop(): Promise<FieldCountDto[]> {
    return this.fieldService.getFieldCountByFarmAndCrop();
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get('mostCommonSoil')
  getMostCommonSoil(): Promise<FieldSoilDto[]> {
    return this.fieldService.getMostCommonSoil();
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get()
  findAll(): Promise<Field[]> {
    return this.fieldService.findAll();
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Field> {
    return this.fieldService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
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

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFieldDto: Partial<CreateFieldDto>,
  ): Promise<Partial<Field>> {
    return this.fieldService.update(id, updateFieldDto);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.fieldService.remove(id);
  }
}
