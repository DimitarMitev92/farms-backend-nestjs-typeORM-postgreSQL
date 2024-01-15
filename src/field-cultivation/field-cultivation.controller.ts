import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FieldCultivationService } from './field-cultivation.service';
import { FieldCultivation } from './field-cultivation.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRightsDec } from 'src/auth/user-rights.decorator';
import { UserRights } from 'src/user/user.entity';

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
  create(@Body() cultivation: FieldCultivation): Promise<FieldCultivation> {
    return this.fieldCultivationService.create(cultivation);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() cultivation: FieldCultivation,
  ): Promise<FieldCultivation> {
    return this.fieldCultivationService.update(id, cultivation);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.fieldCultivationService.remove(id);
  }
}
