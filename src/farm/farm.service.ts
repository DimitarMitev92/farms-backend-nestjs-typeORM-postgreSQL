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
    if (!createFarmDto.name) {
      throw new BadRequestException('Farm name is required.');
    }

    if (!createFarmDto.location) {
      throw new BadRequestException('Farm location is required.');
    }

    const farm = new Farm();
    const farmName = await this.farmRepository.findOne({
      where: { name: createFarmDto.name, deletedAt: null },
    });
    if (farmName) {
      throw new BadRequestException(
        'Farm with this name already exists. Change it!',
      );
    }
    const farmWithSameLocation = await this.farmRepository.findOne({
      where: { location: createFarmDto.location, deletedAt: null },
    });
    if (farmWithSameLocation) {
      throw new BadRequestException(
        'Farm with this location already exists. Change it!',
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
    let farm = await this.farmRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!farm) {
      throw new NotFoundException(`Farm with id ${id} not found`);
    }

    farm = { ...farm, ...updateFarmDto };

    return await this.farmRepository.save(farm);
  }

  async remove(id: string): Promise<{ message: string }> {
    const farm = await this.checkFarmExists(id);
    await this.farmRepository.update(farm.id, { deletedAt: new Date() });
    return { message: 'Farm deleted successfully' };
  }

  async permDelete(id: string): Promise<{ message: string }> {
    const farm = await this.checkFarmExists(id);
    await this.farmRepository.delete(farm.id);
    return { message: 'Farm permanently deleted successfully.' };
  }
}

// {
//   "name": "test2",
//   "location": {
//       "type": "Point",
//       "location": [123.123,123.123]
//   }
// }
