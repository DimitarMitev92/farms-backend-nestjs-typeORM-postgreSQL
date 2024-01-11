import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Soil } from './soil.entity';
import { CreateSoilDto } from './dto/create-soul.dto';

@Injectable()
export class SoilService {
  constructor(
    @InjectRepository(Soil)
    private readonly soilRepository: Repository<Soil>,
  ) {}

  async findAll(): Promise<Soil[]> {
    return this.soilRepository.find();
  }

  async findOne(id: string): Promise<Soil> {
    return this.soilRepository.findOne({ where: { id } });
  }

  async create(createSoilDto: CreateSoilDto): Promise<Soil> {
    const newSoil = this.soilRepository.create(createSoilDto);
    return await this.soilRepository.save(newSoil);
  }

  async update(id: string, updateSoilDto: CreateSoilDto): Promise<Soil> {
    await this.soilRepository.update(id, updateSoilDto);
    return await this.soilRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.soilRepository.update(id, { deletedAt: new Date() });
  }
}
