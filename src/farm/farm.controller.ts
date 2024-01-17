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
import { FarmService } from './farm.service';
import { Farm } from './farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRightsDec } from 'src/auth/user-rights.decorator';
import { UserRights } from 'src/user/user.entity';

@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get()
  findAll(): Promise<Farm[]> {
    return this.farmService.findAll();
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Farm> {
    return this.farmService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Post()
  create(@Body() createFarmDto: CreateFarmDto): Promise<Farm> {
    const farm: Farm = {
      name: createFarmDto.name,
      location: createFarmDto.location,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };

    return this.farmService.create(farm);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatedFarmDto: Partial<CreateFarmDto>,
  ): Promise<Partial<Farm>> {
    return this.farmService.update(id, updatedFarmDto);
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.farmService.remove(id);
  }
}
