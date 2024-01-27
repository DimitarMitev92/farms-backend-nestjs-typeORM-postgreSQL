import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { MachineryService } from './machinery.service';
import { Machinery } from './machinery.entity';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { UserRights } from 'src/user/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('machinery')
export class MachineryController {
  constructor(private readonly machineryService: MachineryService) {}

  @Get()
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findAll(): Promise<Machinery[]> {
    return this.machineryService.findAll();
  }

  @Get(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findOne(@Param('id') id: string): Promise<Machinery> {
    return this.machineryService.findOne(id);
  }

  @Post()
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  create(@Body() createMachineryDto: CreateMachineryDto): Promise<Machinery> {
    const machinery: Machinery = {
      brand: createMachineryDto.brand,
      model: createMachineryDto.model,
      identificationNumber: createMachineryDto.identificationNumber,
      farmId: createMachineryDto.farmId,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };

    return this.machineryService.create(machinery);
  }

  @Patch(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  update(
    @Param('id') id: string,
    @Body() updateMachineryDto: Partial<CreateMachineryDto>,
  ): Promise<Partial<Machinery>> {
    return this.machineryService.update(id, updateMachineryDto);
  }

  @Delete(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.machineryService.remove(id);
  }

  @Delete('perm-delete/:id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.machineryService.permDelete(id);
  }

  @Post('transfer/:machineryId/:farmId')
  @Roles([UserRights.OWNER])
  transferMachinery(
    @Param('machineryId') machineryId: string,
    @Param('farmId') farmId: string,
  ): Promise<Partial<Machinery>> {
    return this.machineryService.transfer(machineryId, farmId);
  }
}
