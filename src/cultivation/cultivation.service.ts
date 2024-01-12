import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cultivation } from './cultivation.entity';
import { CreateCultivationDto } from './dto/create-cultivation.dto';

@Injectable()
export class CultivationService {
  constructor(
    @InjectRepository(Cultivation)
    private readonly cultivationRepository: Repository<Cultivation>,
  ) {}

  async findAll(): Promise<Cultivation[]> {
    return this.cultivationRepository.find();
  }

  async findOne(id: string): Promise<Cultivation> {
    return this.cultivationRepository.findOne({ where: { id } });
  }

  async create(
    createCultivationDto: CreateCultivationDto,
  ): Promise<Cultivation> {
    const cultivation = new Cultivation();
    cultivation.cultivation = createCultivationDto.cultivation;
    return await this.cultivationRepository.save(cultivation);
  }

  async update(
    id: string,
    updateCultivationDto: CreateCultivationDto,
  ): Promise<Cultivation> {
    const cultivation = await this.cultivationRepository.findOne({
      where: { id },
    });
    cultivation.cultivation = updateCultivationDto.cultivation;
    return await this.cultivationRepository.save(cultivation);
  }

  async remove(id: string): Promise<void> {
    await this.cultivationRepository.update(id, { deletedAt: new Date() });
  }
}
