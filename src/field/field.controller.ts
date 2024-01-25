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
import { UserRights } from 'src/user/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Get()
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findAll(): Promise<Field[]> {
    return this.fieldService.findAll();
  }

  @Get(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findOne(@Param('id') id: string): Promise<Field> {
    return this.fieldService.findOne(id);
  }

  @Get('update/:id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findOneForUpdate(@Param('id') id: string): Promise<Field> {
    return this.fieldService.findOneForUpdate(id);
  }

  @Post()
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  create(@Body() createFieldDto: Partial<CreateFieldDto>): Promise<Field> {
    const field: Field = {
      name: createFieldDto.name,
      boundaries: {
        type: 'Polygon',
        coordinates: createFieldDto.boundaries.coordinates,
      },
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
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  update(
    @Param('id') id: string,
    @Body() updateFieldDto: Partial<CreateFieldDto>,
  ): Promise<Partial<Field>> {
    return this.fieldService.update(id, updateFieldDto);
  }

  @Delete(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.fieldService.remove(id);
  }

  @Delete('perm-delete/:id')
  @Roles([UserRights.OWNER])
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.fieldService.permDelete(id);
  }
}
