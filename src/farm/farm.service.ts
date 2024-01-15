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

  private async checkFarmExists(id: string): Promise<Farm> {
    const farm = await this.farmRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!farm) {
      throw new NotFoundException("Farm with this id doesn't exist");
    }
    return farm;
  }

  async findAll(): Promise<Farm[]> {
    return this.farmRepository.find();
  }

  async findOne(id: string): Promise<Farm> {
    return this.checkFarmExists(id);
  }

  async create(createFarmDto: CreateFarmDto): Promise<Farm> {
    const farm = new Farm();
    const farmName = await this.farmRepository.findOne({
      where: { name: createFarmDto.name, deletedAt: null },
    });
    if (farmName) {
      throw new BadRequestException(
        'Farm with this name is already exist. Change it!',
      );
    }
    const farmLocation = await this.farmRepository.findOne({
      where: { location: createFarmDto.location, deletedAt: null },
    });
    if (farmLocation) {
      throw new BadRequestException(
        'Farm with this location is already exist. Change it!',
      );
    }
    farm.name = createFarmDto.name;
    farm.location = createFarmDto.location;
    return await this.farmRepository.save(farm);
  }

  async update(
    id: string,
    updateFarmDto: Partial<CreateFarmDto>,
  ): Promise<Farm> {
    const farm = await this.farmRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!farm) {
      throw new Error(`Farm with id ${id} not found`);
    }

    Object.assign(farm, updateFarmDto);

    return await this.farmRepository.save(farm);
  }

  async remove(id: string): Promise<void> {
    await this.farmRepository.update(id, { deletedAt: new Date() });
  }
}
