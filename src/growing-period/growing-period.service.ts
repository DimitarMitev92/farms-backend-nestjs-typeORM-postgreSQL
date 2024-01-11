import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrowingPeriod } from './growing-period.entity';
import { CreateGrowingPeriodDto } from './dto/create-growing-period.dto';

@Injectable()
export class GrowingPeriodService {
  constructor(
    @InjectRepository(GrowingPeriod)
    private readonly growingPeriodRepository: Repository<GrowingPeriod>,
  ) {}

  async findAll(): Promise<GrowingPeriod[]> {
    return this.growingPeriodRepository.find();
  }

  async findOne(id: string): Promise<GrowingPeriod> {
    return this.growingPeriodRepository.findOne({ where: { id } });
  }

  async create(
    createGrowingPeriodDto: CreateGrowingPeriodDto,
  ): Promise<GrowingPeriod> {
    const newGrowingPeriod = this.growingPeriodRepository.create(
      createGrowingPeriodDto,
    );
    return await this.growingPeriodRepository.save(newGrowingPeriod);
  }

  async update(
    id: string,
    updateGrowingPeriodDto: Partial<CreateGrowingPeriodDto>,
  ): Promise<GrowingPeriod> {
    const growingPeriod = await this.growingPeriodRepository.findOne({
      where: { id },
    });

    if (!growingPeriod) {
      throw new Error(`Field with id ${id} not found`);
    }

    Object.assign(growingPeriod, updateGrowingPeriodDto);

    return await this.growingPeriodRepository.save(growingPeriod);
  }

  async remove(id: string): Promise<void> {
    await this.growingPeriodRepository.update(id, { deletedAt: new Date() });
  }
}
