import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
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

  private async checkFarmExists(id: string): Promise<Farm> {
    try {
      const farm = await this.farmRepository.findOne({
        where: { id, deletedAt: null },
      });
      if (!farm) {
        throw new NotFoundException("Farm with this id doesn't exist");
      }
      return farm;
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching farm data');
    }
  }

  async findAll(): Promise<Farm[]> {
    try {
      return this.farmRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching farms');
    }
  }

  async findOne(id: string): Promise<Farm> {
    return this.checkFarmExists(id);
  }

  async create(createFarmDto: CreateFarmDto): Promise<Farm> {
    try {
      const farm = new Farm();
      const farmName = await this.farmRepository.findOne({
        where: { name: createFarmDto.name, deletedAt: null },
      });
      if (farmName) {
        throw new BadRequestException(
          'Farm with this name already exists. Change it!',
        );
      }
      // const farmWithSameLocation = await this.farmRepository.findOne({
      //   where: { location: createFarmDto.location, deletedAt: null },
      // });
      // if (farmWithSameLocation) {
      //   throw new BadRequestException(
      //     'Farm with this location already exists. Change it!',
      //   );
      // }
      farm.name = createFarmDto.name;
      farm.location = createFarmDto.location;
      return await this.farmRepository.save(farm);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error while creating farm');
    }
  }

  async update(
    id: string,
    updateFarmDto: Partial<CreateFarmDto>,
  ): Promise<Farm> {
    try {
      const farm = await this.farmRepository.findOne({
        where: { id, deletedAt: null },
      });

      if (!farm) {
        throw new NotFoundException(`Farm with id ${id} not found`);
      }

      Object.assign(farm, updateFarmDto);

      return await this.farmRepository.save(farm);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error while updating farm');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.farmRepository.update(id, { deletedAt: new Date() });
    } catch (error) {
      throw new InternalServerErrorException('Error while removing farm');
    }
  }
}
