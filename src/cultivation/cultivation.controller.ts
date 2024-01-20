import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { CultivationService } from './cultivation.service';
import { Cultivation } from './cultivation.entity';
import { CreateCultivationDto } from './dto/create-cultivation.dto';
import { UserRights } from 'src/user/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('cultivation')
export class CultivationController {
  constructor(private readonly cultivationService: CultivationService) {}

  @Get()
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findAll(): Promise<Cultivation[]> {
    return this.cultivationService.findAll();
  }

  @Get(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findOne(@Param('id') id: string): Promise<Cultivation> {
    return this.cultivationService.findOne(id);
  }

  @Post()
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  create(
    @Body() createCultivationDto: CreateCultivationDto,
  ): Promise<Cultivation> {
    return this.cultivationService.create(createCultivationDto);
  }

  @Patch(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  update(
    @Param('id') id: string,
    @Body() updateCultivationDto: CreateCultivationDto,
  ): Promise<Cultivation> {
    return this.cultivationService.update(id, updateCultivationDto);
  }

  @Delete(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.cultivationService.remove(id);
  }

  @Delete('perm-delete/:id')
  @Roles([UserRights.OWNER])
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.cultivationService.permDelete(id);
  }
}
