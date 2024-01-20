import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { CropService } from './crop.service';
import { Crop } from './crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { UserRights } from 'src/user/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('crop')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Get()
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findAll(): Promise<Crop[]> {
    return this.cropService.findAll();
  }

  @Get(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findOne(@Param('id') id: string): Promise<Crop> {
    return this.cropService.findOne(id);
  }

  @Post()
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  create(@Body() createCropDto: CreateCropDto): Promise<Crop> {
    return this.cropService.create(createCropDto);
  }

  @Patch(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  async update(
    @Param('id') id: string,
    @Body() updatedCropDto: CreateCropDto,
  ): Promise<Crop> {
    return this.cropService.update(id, updatedCropDto);
  }

  @Delete(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.cropService.remove(id);
  }

  @Delete('perm-delete/:id')
  @Roles([UserRights.OWNER])
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.cropService.permDelete(id);
  }
}
