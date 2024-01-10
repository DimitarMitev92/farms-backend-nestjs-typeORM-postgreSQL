import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Soil } from './soil.entity';

@Injectable()
export class SoilService {
  constructor(
    @InjectRepository(Soil)
    private readonly soilRepository: Repository<Soil>,
  ) {}

  findAll(): Promise<Soil[]> {
    return this.soilRepository.find();
  }

  findOne(id: string): Promise<Soil> {
    return this.soilRepository.findOne({ where: { id } });
  }

  async create(soil: Soil): Promise<Soil> {
    const newSoil = this.soilRepository.create(soil);
    return await this.soilRepository.save(newSoil);
  }

  async update(id: string, soil: Soil): Promise<Soil> {
    await this.soilRepository.update(id, soil);
    return await this.soilRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.soilRepository.delete(id);
  }
}
