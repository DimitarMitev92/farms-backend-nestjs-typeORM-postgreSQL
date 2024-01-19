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
import { GrowingProcessService } from './growing-process.service';
import { GrowingProcess } from './growing-process.entity';
import { CreateGrowingProcessDto } from './dto/create-growing-process.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRightsDec } from 'src/auth/user-rights.decorator';
import { UserRights } from 'src/user/user.entity';

@Controller('growing-process')
export class GrowingProcessController {
  constructor(private readonly growingProcessService: GrowingProcessService) {}

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get()
  findAll(): Promise<GrowingProcess[]> {
    return this.growingProcessService.findAll();
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GrowingProcess> {
    return this.growingProcessService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Post()
  create(
    @Body() createGrowingProcessDto: Partial<CreateGrowingProcessDto>,
  ): Promise<GrowingProcess> {
    const growingProcess: GrowingProcess = {
      cropId: createGrowingProcessDto.cropId,
      fieldId: createGrowingProcessDto.fieldId,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };
    return this.growingProcessService.create(growingProcess);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGrowingProcessDto: Partial<CreateGrowingProcessDto>,
  ): Promise<Partial<GrowingProcess>> {
    return this.growingProcessService.update(id, updateGrowingProcessDto);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.growingProcessService.remove(id);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER)
  @Delete('perm-delete/:id')
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.growingProcessService.permDelete(id);
  }
}
