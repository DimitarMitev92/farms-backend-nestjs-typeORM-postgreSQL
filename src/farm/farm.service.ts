import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from './farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async findAll(): Promise<Farm[]> {
    return this.farmRepository.find();
  }

  async findOne(id: string): Promise<Farm> {
    return this.farmRepository.findOne({ where: { id } });
  }

  async create(createFarmDto: CreateFarmDto): Promise<Farm> {
    const newFarm = this.farmRepository.create(createFarmDto);
    return await this.farmRepository.save(newFarm);
  }

  async update(
    id: string,
    updateFarmDto: Partial<CreateFarmDto>,
  ): Promise<Farm> {
    const farm = await this.farmRepository.findOne({ where: { id } });

    if (!farm) {
      throw new Error(`Farm with id ${id} not found`);
    }

    Object.assign(farm, updateFarmDto);

    return await this.farmRepository.save(farm);
  }

  async remove(id: string): Promise<void> {
    await this.farmRepository.update(id, { deletedAt: new Date() });
  }
}
