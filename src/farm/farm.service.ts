import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from './farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { Machinery } from 'src/machinery/machinery.entity';
import { Field } from 'src/field/field.entity';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(Machinery)
    private readonly machineryRepository: Repository<Machinery>,
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
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
      where: {
        location: {
          type: 'Point',
          coordinates: createFarmDto.location.coordinates,
        },
        deletedAt: null,
      },
    });
    if (farmWithSameLocation) {
      throw new BadRequestException(
        'Farm with this location already exists. Change it!',
      );
    }
    farm.name = createFarmDto.name;
    farm.location = {
      type: 'Point',
      coordinates: createFarmDto.location.coordinates,
    };
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

    const oldFarm = { ...farm };

    farm = {
      ...farm,
      ...updateFarmDto,
      location: {
        type: 'Point',
        coordinates:
          updateFarmDto.location?.coordinates || oldFarm.location.coordinates,
      },
    };

    farm = await this.farmRepository.save(farm);

    return farm;
  }

  async remove(id: string): Promise<{ message: string }> {
    const farm = await this.checkFarmExists(id);
    const isFarmHasField = await this.fieldRepository.findOne({
      where: { farmId: id, deletedAt: null },
    });
    if (isFarmHasField)
      throw new BadRequestException(
        'Farm has a field. Please first delete field.',
      );
    const isFarmHasMachinery = await this.machineryRepository.findOne({
      where: { farmId: id, deletedAt: null },
    });
    if (isFarmHasMachinery)
      throw new BadRequestException(
        'Farm has a machinery. Please first delete machinery.',
      );
    await this.farmRepository.update(farm.id, { deletedAt: new Date() });
    return { message: 'Farm deleted successfully' };
  }

  async permDelete(id: string): Promise<{ message: string }> {
    const farm = await this.checkFarmExists(id);
    const isFarmHasField = await this.fieldRepository.findOne({
      where: { farmId: id, deletedAt: null },
    });
    if (isFarmHasField)
      throw new BadRequestException(
        'Farm has a field. Please first delete field.',
      );
    const isFarmHasMachinery = await this.machineryRepository.findOne({
      where: { farmId: id, deletedAt: null },
    });
    if (isFarmHasMachinery)
      throw new BadRequestException(
        'Farm has a machinery. Please first delete machinery.',
      );
    await this.farmRepository.delete(farm.id);
    return { message: 'Farm permanently deleted successfully.' };
  }
}

// {
//   "name": "test2",
//   "location": {
//       "type": "Point",
//       "location": [10.123456,20.654321]
//   }
// }
