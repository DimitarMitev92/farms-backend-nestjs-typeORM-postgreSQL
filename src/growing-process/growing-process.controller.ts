import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { GrowingProcessService } from './growing-process.service';
import { GrowingProcess } from './growing-process.entity';
import { CreateGrowingProcessDto } from './dto/create-growing-process.dto';

@Controller('growing-process')
export class GrowingProcessController {
  constructor(private readonly growingProcessService: GrowingProcessService) {}

  @Get()
  findAll(): Promise<GrowingProcess[]> {
    return this.growingProcessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GrowingProcess> {
    return this.growingProcessService.findOne(id);
  }

  @Post()
  create(
    @Body() createGrowingProcessDto: Partial<CreateGrowingProcessDto>,
  ): Promise<GrowingProcess> {
    const growingProcess: GrowingProcess = {
      cropId: createGrowingProcessDto.cropId,
      fieldId: createGrowingProcessDto.fieldId,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };
    return this.growingProcessService.create(growingProcess);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGrowingProcessDto: Partial<CreateGrowingProcessDto>,
  ): Promise<Partial<GrowingProcess>> {
    return this.growingProcessService.update(id, updateGrowingProcessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.growingProcessService.remove(id);
  }

  @Delete('perm-delete/:id')
  async permRemove(@Param('id') id: string): Promise<{ message: string }> {
    return this.growingProcessService.permDelete(id);
  }
}
