import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
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
    try {
      const soil = await this.soilRepository.findOne({
        where: { id, deletedAt: null },
      });
      if (!soil) {
        throw new NotFoundException("Soil with this id doesn't exist");
      }
      return soil;
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching soil data');
    }
  }

  async findAll(): Promise<Soil[]> {
    try {
      return this.soilRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching soils');
    }
  }

  async findOne(id: string): Promise<Soil> {
    return this.checkSoilExists(id);
  }

  async create(createSoilDto: CreateSoilDto): Promise<Soil> {
    try {
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
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error while creating soil');
    }
  }

  async update(id: string, updateSoilDto: CreateSoilDto): Promise<Soil> {
    try {
      const soil = await this.checkSoilExists(id);
      soil.soil = updateSoilDto.soil;
      return await this.soilRepository.save(soil);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error while updating soil');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const soil = await this.checkSoilExists(id);
      await this.soilRepository.update(soil.id, {
        deletedAt: new Date(),
      });
    } catch (error) {
      throw new InternalServerErrorException('Error while removing soil');
    }
  }
}
