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

  findAll(): Promise<Farm[]> {
    return this.farmRepository.find();
  }

  findOne(id: string): Promise<Farm> {
    return this.farmRepository.findOne({ where: { id } });
  }

  async create(farm: Farm): Promise<Farm> {
    const newFarm = this.farmRepository.create(farm);
    return await this.farmRepository.save(newFarm);
  }

  async update(
    id: string,
    updatedFarmDto: Partial<CreateFarmDto>,
  ): Promise<Farm> {
    const farm = await this.farmRepository.findOne({ where: { id } });

    if (!farm) {
      throw new Error(`Farm with id ${id} not found`);
    }

    Object.assign(farm, updatedFarmDto);

    return await this.farmRepository.save(farm);
  }

  async remove(id: string): Promise<void> {
    await this.farmRepository.update(id, { deletedAt: new Date() });
  }
}
