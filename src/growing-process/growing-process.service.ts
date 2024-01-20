import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrowingProcess } from './growing-process.entity';
import { CreateGrowingProcessDto } from './dto/create-growing-process.dto';
import { Crop } from 'src/crop/crop.entity';
import { Field } from 'src/field/field.entity';

@Injectable()
export class GrowingProcessService {
  constructor(
    @InjectRepository(GrowingProcess)
    private readonly growingProcessRepository: Repository<GrowingProcess>,
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {}

  private async checkGrowingProcessExists(id: string): Promise<GrowingProcess> {
    const growingProcess = await this.growingProcessRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!growingProcess) {
      throw new NotFoundException("Growing process with this id doesn't exist");
    }
    return growingProcess;
  }

  async findAll(): Promise<GrowingProcess[]> {
    return this.growingProcessRepository.find();
  }

  async findOne(id: string): Promise<GrowingProcess> {
    return this.checkGrowingProcessExists(id);
  }

  async create(
    createGrowingProcessDto: CreateGrowingProcessDto,
  ): Promise<GrowingProcess> {
    const growingProcess = new GrowingProcess();
    const cropIdExist = await this.cropRepository.findOne({
      where: { id: createGrowingProcessDto.cropId, deletedAt: null },
    });
    if (!cropIdExist) {
      throw new BadRequestException('Invalid crop id.');
    }
    const fieldIdExist = await this.fieldRepository.findOne({
      where: { id: createGrowingProcessDto.fieldId, deletedAt: null },
    });
    if (!fieldIdExist) {
      throw new BadRequestException('Invalid field id.');
    }
    growingProcess.cropId = createGrowingProcessDto.cropId;
    growingProcess.fieldId = createGrowingProcessDto.fieldId;
    return await this.growingProcessRepository.save(growingProcess);
  }

  async update(
    id: string,
    updateGrowingProcessDto: Partial<CreateGrowingProcessDto>,
  ): Promise<GrowingProcess> {
    const growingProcess = await this.growingProcessRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!growingProcess) {
      throw new NotFoundException(`Growing process with id ${id} not found`);
    }

    const cropIdExist = await this.cropRepository.findOne({
      where: { id: updateGrowingProcessDto.cropId, deletedAt: null },
    });
    if (!cropIdExist) {
      throw new BadRequestException('Invalid crop id.');
    }
    const fieldIdExist = await this.fieldRepository.findOne({
      where: { id: updateGrowingProcessDto.fieldId, deletedAt: null },
    });
    if (!fieldIdExist) {
      throw new BadRequestException('Invalid field id.');
    }

    Object.assign(growingProcess, updateGrowingProcessDto);

    return await this.growingProcessRepository.save(growingProcess);
  }

  async remove(id: string): Promise<{ message: string }> {
    const growingProcess = await this.checkGrowingProcessExists(id);
    await this.growingProcessRepository.update(growingProcess.id, {
      deletedAt: new Date(),
    });
    return { message: 'Growing process deleted successfully' };
  }

  async permDelete(id: string): Promise<{ message: string }> {
    const growingProcess = await this.checkGrowingProcessExists(id);
    await this.growingProcessRepository.delete(growingProcess.id);
    return { message: 'Growing process permanently deleted successfully.' };
  }
}
