import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { Farm } from './farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UserRights } from 'src/user/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Get()
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findAll(): Promise<Farm[]> {
    return this.farmService.findAll();
  }

  @Get(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  findOne(@Param('id') id: string): Promise<Farm> {
    return this.farmService.findOne(id);
  }

  @Post()
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  create(@Body() createFarmDto: CreateFarmDto): Promise<Farm> {
    const farm: Farm = {
      name: createFarmDto.name,
      location: {
        type: 'Point',
        coordinates: createFarmDto.location.coordinates,
      },
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };

    return this.farmService.create(farm);
  }

  @Patch(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  update(
    @Param('id') id: string,
    @Body() updatedFarmDto: Partial<CreateFarmDto>,
  ): Promise<Partial<Farm>> {
    return this.farmService.update(id, updatedFarmDto);
  }

  @Delete(':id')
  @Roles([UserRights.OWNER, UserRights.OPERATOR])
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.farmService.remove(id);
  }

  @Delete('perm-delete/:id')
  @Roles([UserRights.OWNER])
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.farmService.permDelete(id);
  }
}
