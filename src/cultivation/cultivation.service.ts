import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cultivation } from './cultivation.entity';
import { Repository } from 'typeorm';
import { CreateCultivationDto } from './dto/create-cultivation.dto';

@Injectable()
export class CultivationService {
  constructor(
    @InjectRepository(Cultivation)
    private readonly cultivationRepository: Repository<Cultivation>,
  ) {}

  private async checkCultivationExists(id: string): Promise<Cultivation> {
    const cultivation = await this.cultivationRepository.findOne({
      where: { id },
    });
    if (!cultivation) {
      throw new NotFoundException("Cultivation with this id doesn't exist");
    }
    return cultivation;
  }

  async findAll(): Promise<Cultivation[]> {
    return this.cultivationRepository.find();
  }

  async findOne(id: string): Promise<Cultivation> {
    return this.checkCultivationExists(id);
  }

  async create(
    createCultivationDto: CreateCultivationDto,
  ): Promise<Cultivation> {
    const cultivation = new Cultivation();
    const cultivationName = await this.cultivationRepository.findOne({
      where: { cultivation: createCultivationDto.cultivation },
    });
    if (cultivationName) {
      throw new BadRequestException(
        'Crop with this name is already exist. Change it!',
      );
    }
    cultivation.cultivation = createCultivationDto.cultivation;
    return await this.cultivationRepository.save(cultivation);
  }

  async update(
    id: string,
    updateCultivationDto: CreateCultivationDto,
  ): Promise<Cultivation> {
    const cultivation = await this.checkCultivationExists(id);
    cultivation.cultivation = updateCultivationDto.cultivation;
    return await this.cultivationRepository.save(cultivation);
  }

  async remove(id: string): Promise<void> {
    const cultivation = await this.checkCultivationExists(id);
    await this.cultivationRepository.update(cultivation.id, {
      deletedAt: new Date(),
    });
  }
}
