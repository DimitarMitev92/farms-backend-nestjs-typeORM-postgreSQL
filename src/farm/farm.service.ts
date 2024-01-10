import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from './farm.entity';

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

  async update(id: string, farm: Farm): Promise<Farm> {
    await this.farmRepository.update(id, farm);
    return await this.farmRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.farmRepository.delete(id);
  }
}
