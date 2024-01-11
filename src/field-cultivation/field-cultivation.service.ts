import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FieldCultivation } from './field-cultivation.entity';

@Injectable()
export class FieldCultivationService {
  constructor(
    @InjectRepository(FieldCultivation)
    private readonly fieldCultivationRepository: Repository<FieldCultivation>,
  ) {}

  findAll(): Promise<FieldCultivation[]> {
    return this.fieldCultivationRepository.find();
  }

  findOne(id: string): Promise<FieldCultivation> {
    return this.fieldCultivationRepository.findOne({ where: { id } });
  }

  async create(cultivation: FieldCultivation): Promise<FieldCultivation> {
    const newCultivation = this.fieldCultivationRepository.create(cultivation);
    return await this.fieldCultivationRepository.save(newCultivation);
  }

  async update(
    id: string,
    cultivation: FieldCultivation,
  ): Promise<FieldCultivation> {
    await this.fieldCultivationRepository.update(id, cultivation);
    return await this.fieldCultivationRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.fieldCultivationRepository.update(id, { deletedAt: new Date() });
  }
}
