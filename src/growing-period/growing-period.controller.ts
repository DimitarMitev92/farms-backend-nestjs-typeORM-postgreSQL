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
import { GrowingPeriodService } from './growing-period.service';
import { GrowingPeriod } from './growing-period.entity';
import { CreateGrowingPeriodDto } from './dto/create-growing-period.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRightsDec } from 'src/auth/user-rights.decorator';
import { UserRights } from 'src/user/user.entity';

@Controller('growing-period')
export class GrowingPeriodController {
  constructor(private readonly growingPeriodService: GrowingPeriodService) {}

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get()
  findAll(): Promise<GrowingPeriod[]> {
    return this.growingPeriodService.findAll();
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GrowingPeriod> {
    return this.growingPeriodService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Post()
  create(
    @Body() createGrowingPeriodDto: Partial<CreateGrowingPeriodDto>,
  ): Promise<GrowingPeriod> {
    const growingPeriod: GrowingPeriod = {
      cropId: createGrowingPeriodDto.cropId,
      fieldId: createGrowingPeriodDto.fieldId,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };
    console.log(growingPeriod);
    return this.growingPeriodService.create(growingPeriod);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGrowingProcessDto: Partial<CreateGrowingPeriodDto>,
  ): Promise<Partial<GrowingPeriod>> {
    return this.growingPeriodService.update(id, updateGrowingProcessDto);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.growingPeriodService.remove(id);
  }
}
