import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrowingPeriod } from './growing-period.entity';
import { CreateGrowingPeriodDto } from './dto/create-growing-period.dto';
import { Crop } from 'src/crop/crop.entity';
import { Field } from 'src/field/field.entity';

@Injectable()
export class GrowingPeriodService {
  constructor(
    @InjectRepository(GrowingPeriod)
    private readonly growingPeriodRepository: Repository<GrowingPeriod>,
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {}

  private async checkGrowingPeriodExists(id: string): Promise<GrowingPeriod> {
    const growingPeriod = await this.growingPeriodRepository.findOne({
      where: { id },
    });
    if (!growingPeriod) {
      throw new NotFoundException("Growing period with this id doesn't exist");
    }
    return growingPeriod;
  }

  async findAll(): Promise<GrowingPeriod[]> {
    return this.growingPeriodRepository.find();
  }

  async findOne(id: string): Promise<GrowingPeriod> {
    return this.checkGrowingPeriodExists(id);
  }

  async create(
    createGrowingPeriodDto: CreateGrowingPeriodDto,
  ): Promise<GrowingPeriod> {
    const growingPeriod = new GrowingPeriod();
    const cropIdExist = await this.cropRepository.findOne({
      where: { id: createGrowingPeriodDto.cropId },
    });
    if (!cropIdExist) {
      throw new BadRequestException('Invalid crop id.');
    }
    const fieldIdExist = await this.fieldRepository.findOne({
      where: { id: createGrowingPeriodDto.fieldId },
    });
    if (!fieldIdExist) {
      throw new BadRequestException('Invalid field id.');
    }
    console.log(growingPeriod);
    console.log(createGrowingPeriodDto);
    growingPeriod.cropId = createGrowingPeriodDto.cropId;
    growingPeriod.fieldId = createGrowingPeriodDto.fieldId;
    return this.growingPeriodRepository.save(growingPeriod);
  }

  async update(
    id: string,
    updateGrowingPeriodDto: Partial<CreateGrowingPeriodDto>,
  ): Promise<GrowingPeriod> {
    const growingPeriod = await this.growingPeriodRepository.findOne({
      where: { id },
    });

    if (!growingPeriod) {
      throw new Error(`Growing period with id ${id} not found`);
    }

    const cropIdExist = await this.cropRepository.findOne({
      where: { id: updateGrowingPeriodDto.cropId },
    });
    if (!cropIdExist) {
      throw new BadRequestException('Invalid crop id.');
    }
    const fieldIdExist = await this.fieldRepository.findOne({
      where: { id: updateGrowingPeriodDto.fieldId },
    });
    if (!fieldIdExist) {
      throw new BadRequestException('Invalid field id.');
    }

    Object.assign(growingPeriod, updateGrowingPeriodDto);

    return await this.growingPeriodRepository.save(growingPeriod);
  }

  async remove(id: string): Promise<void> {
    await this.growingPeriodRepository.update(id, { deletedAt: new Date() });
  }
}
