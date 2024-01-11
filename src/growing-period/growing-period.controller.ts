import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { GrowingPeriodService } from './growing-period.service';
import { GrowingPeriod } from './growing-period.entity';
import { CreateGrowingPeriodDto } from './dto/create-growing-period.dto';

@Controller('field')
export class GrowingPeriodController {
  constructor(private readonly growingPeriodService: GrowingPeriodService) {}

  @Get()
  findAll(): Promise<GrowingPeriod[]> {
    return this.growingPeriodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GrowingPeriod> {
    return this.growingPeriodService.findOne(id);
  }

  @Post()
  create(
    @Body() createGrowingPeriodDto: Partial<CreateGrowingPeriodDto>,
  ): Promise<GrowingPeriod> {
    ///////////////////////////////////////////
    //ADD VALIDATION FOR farmId, cropId, soilId
    ///////////////////////////////////////////

    const growingPeriod: GrowingPeriod = {
      cropId: createGrowingPeriodDto.cropId,
      fieldId: createGrowingPeriodDto.fieldId,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };

    return this.growingPeriodService.create(growingPeriod);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateGrowingProcessDto: Partial<CreateGrowingPeriodDto>,
  ): Promise<Partial<GrowingPeriod>> {
    return this.growingPeriodService.update(id, updateGrowingProcessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.growingPeriodService.remove(id);
  }
}
