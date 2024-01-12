import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from './farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async findAll(): Promise<Farm[]> {
    return this.farmRepository.find();
  }

  async findOne(id: string): Promise<Farm> {
    return this.farmRepository.findOne({ where: { id } });
  }

  async create(createFarmDto: CreateFarmDto): Promise<Farm> {
    try {
      const newFarm = this.farmRepository.create(createFarmDto);
      return await this.farmRepository.save(newFarm);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('An unknown error occurred');
      }
    }
  }

  async update(
    id: string,
    updateFarmDto: Partial<CreateFarmDto>,
  ): Promise<Farm> {
    const farm = await this.farmRepository.findOne({ where: { id } });

    if (!farm) {
      throw new NotFoundException(`Farm with id ${id} not found`);
    }

    Object.assign(farm, updateFarmDto);

    try {
      return await this.farmRepository.save(farm);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('An unknown error occurred');
      }
    }
  }

  async remove(id: string): Promise<void> {
    await this.farmRepository.update(id, { deletedAt: new Date() });
  }
}
