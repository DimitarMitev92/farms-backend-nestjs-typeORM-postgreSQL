import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { SoilService } from './soil.service';
import { Soil } from './soil.entity';
import { CreateSoilDto } from './dto/create-soul.dto';
import { UserRights } from 'src/user/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('soil')
export class SoilController {
  constructor(private readonly soilService: SoilService) {}

  @Get()
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findAll(): Promise<Soil[]> {
    return this.soilService.findAll();
  }

  @Get(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findOne(@Param('id') id: string): Promise<Soil> {
    return this.soilService.findOne(id);
  }

  @Post()
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  create(@Body() createSoilDto: CreateSoilDto): Promise<Soil> {
    return this.soilService.create(createSoilDto);
  }

  @Patch(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  update(
    @Param('id') id: string,
    @Body() updateSoilDto: CreateSoilDto,
  ): Promise<Soil> {
    return this.soilService.update(id, updateSoilDto);
  }

  @Delete(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.soilService.remove(id);
  }

  @Delete('perm-delete/:id')
  @Roles([UserRights.OWNER])
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.soilService.permDelete(id);
  }
}
