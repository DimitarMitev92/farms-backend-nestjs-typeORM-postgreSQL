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
import { CropService } from './crop.service';
import { Crop } from './crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRightsDec } from 'src/auth/user-rights.decorator';
import { UserRights } from 'src/user/user.entity';

@Controller('crop')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get()
  findAll(): Promise<Crop[]> {
    return this.cropService.findAll();
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Crop> {
    return this.cropService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Post()
  create(@Body() createCropDto: CreateCropDto): Promise<Crop> {
    return this.cropService.create(createCropDto);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedCropDto: CreateCropDto,
  ): Promise<Crop> {
    return this.cropService.update(id, updatedCropDto);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cropService.remove(id);
  }
}
