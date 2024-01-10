import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cultivation } from './cultivation.entity';

@Injectable()
export class CultivationService {
  constructor(
    @InjectRepository(Cultivation)
    private readonly cultivationRepository: Repository<Cultivation>,
  ) {}

  findAll(): Promise<Cultivation[]> {
    return this.cultivationRepository.find();
  }

  findOne(id: string): Promise<Cultivation> {
    return this.cultivationRepository.findOne({ where: { id } });
  }

  async create(cultivation: Cultivation): Promise<Cultivation> {
    const newCultivation = this.cultivationRepository.create(cultivation);
    return await this.cultivationRepository.save(newCultivation);
  }

  async update(id: string, cultivation: Cultivation): Promise<Cultivation> {
    await this.cultivationRepository.update(id, cultivation);
    return await this.cultivationRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.cultivationRepository.delete(id);
  }
}
