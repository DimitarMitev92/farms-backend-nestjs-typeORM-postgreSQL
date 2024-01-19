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
import { CultivationService } from './cultivation.service';
import { Cultivation } from './cultivation.entity';
import { CreateCultivationDto } from './dto/create-cultivation.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRightsDec } from 'src/auth/user-rights.decorator';
import { UserRights } from 'src/user/user.entity';

@Controller('cultivation')
export class CultivationController {
  constructor(private readonly cultivationService: CultivationService) {}

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get()
  findAll(): Promise<Cultivation[]> {
    return this.cultivationService.findAll();
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cultivation> {
    return this.cultivationService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Post()
  create(
    @Body() createCultivationDto: CreateCultivationDto,
  ): Promise<Cultivation> {
    return this.cultivationService.create(createCultivationDto);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCultivationDto: CreateCultivationDto,
  ): Promise<Cultivation> {
    return this.cultivationService.update(id, updateCultivationDto);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.cultivationService.remove(id);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER)
  @Delete('perm-delete/:id')
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.cultivationService.permDelete(id);
  }
}
