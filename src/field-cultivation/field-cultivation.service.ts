import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FieldCultivation } from './field-cultivation.entity';

@Injectable()
export class FieldCultivationService {
  constructor(
    @InjectRepository(FieldCultivation)
    private readonly cultivationRepository: Repository<FieldCultivation>,
  ) {}

  findAll(): Promise<FieldCultivation[]> {
    return this.cultivationRepository.find();
  }

  findOne(id: string): Promise<FieldCultivation> {
    return this.cultivationRepository.findOne({ where: { id } });
  }

  async create(cultivation: FieldCultivation): Promise<FieldCultivation> {
    const newCultivation = this.cultivationRepository.create(cultivation);
    return await this.cultivationRepository.save(newCultivation);
  }

  async update(
    id: string,
    cultivation: FieldCultivation,
  ): Promise<FieldCultivation> {
    await this.cultivationRepository.update(id, cultivation);
    return await this.cultivationRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.cultivationRepository.delete(id);
  }
}
