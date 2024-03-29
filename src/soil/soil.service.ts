import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  private async checkSoilExists(id: string): Promise<Soil> {
    const soil = await this.soilRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!soil) {
      throw new NotFoundException("Soil with this id doesn't exist");
    }
    return soil;
  }

  async findAll(): Promise<Soil[]> {
    return this.soilRepository.find();
  }

  async findOne(id: string): Promise<Soil> {
    return this.checkSoilExists(id);
  }

  async create(createSoilDto: CreateSoilDto): Promise<Soil> {
    if (!createSoilDto.soil) {
      throw new BadRequestException('Soil is required.');
    }
    const soil = new Soil();
    const soilName = await this.soilRepository.findOne({
      where: { soil: createSoilDto.soil, deletedAt: null },
    });
    if (soilName) {
      throw new BadRequestException(
        'Soil with this name already exists. Change it!',
      );
    }
    soil.soil = createSoilDto.soil;
    return await this.soilRepository.save(soil);
  }

  async update(id: string, updateSoilDto: CreateSoilDto): Promise<Soil> {
    if (!updateSoilDto.soil) {
      throw new BadRequestException('Soil is required.');
    }
    const soil = await this.checkSoilExists(id);
    soil.soil = updateSoilDto.soil;
    return await this.soilRepository.save(soil);
  }

  async remove(id: string): Promise<{ message: string }> {
    const soil = await this.checkSoilExists(id);
    await this.soilRepository.update(soil.id, {
      deletedAt: new Date(),
    });
    return { message: 'Soil deleted successfully' };
  }

  async permDelete(id: string): Promise<{ message: string }> {
    const soil = await this.checkSoilExists(id);
    await this.soilRepository.delete(soil.id);
    return { message: 'Crop permanently deleted successfully.' };
  }
}
