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
import { MachineryService } from './machinery.service';
import { Machinery } from './machinery.entity';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRightsDec } from 'src/auth/user-rights.decorator';
import { UserRights } from 'src/user/user.entity';

@Controller('machinery')
export class MachineryController {
  constructor(private readonly machineryService: MachineryService) {}

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get()
  findAll(): Promise<Machinery[]> {
    return this.machineryService.findAll();
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Machinery> {
    return this.machineryService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Post()
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

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMachineryDto: Partial<CreateMachineryDto>,
  ): Promise<Partial<Machinery>> {
    return this.machineryService.update(id, updateMachineryDto);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.machineryService.remove(id);
  }
}
