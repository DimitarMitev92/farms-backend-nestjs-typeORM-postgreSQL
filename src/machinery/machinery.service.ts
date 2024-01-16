import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machinery } from './machinery.entity';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { Farm } from 'src/farm/farm.entity';

@Injectable()
export class MachineryService {
  constructor(
    @InjectRepository(Machinery)
    private readonly machineryRepository: Repository<Machinery>,
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  private async checkMachineryExists(id: string): Promise<Machinery> {
    const machinery = await this.machineryRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!machinery) {
      throw new NotFoundException("Machinery with this id doesn't exist");
    }
    return machinery;
  }

  findAll(): Promise<Machinery[]> {
    return this.machineryRepository.find();
  }

  findOne(id: string): Promise<Machinery> {
    return this.checkMachineryExists(id);
  }

  async create(createMachineryDto: CreateMachineryDto): Promise<Machinery> {
    const machinery = new Machinery();
    const identificationNumberExist = await this.machineryRepository.findOne({
      where: {
        identificationNumber: createMachineryDto.identificationNumber,
        deletedAt: null,
      },
    });
    if (identificationNumberExist) {
      throw new BadRequestException(
        'Machinery with this identification number is already in the database.',
      );
    }
    const farmIdExist = await this.farmRepository.findOne({
      where: { id: createMachineryDto.farmId, deletedAt: null },
    });
    if (!farmIdExist) {
      throw new BadRequestException('Invalid farm id.');
    }
    machinery.brand = createMachineryDto.brand;
    machinery.model = createMachineryDto.model;
    machinery.identificationNumber = createMachineryDto.identificationNumber;
    machinery.farmId = createMachineryDto.farmId;
    return await this.machineryRepository.save(machinery);
  }

  async update(
    id: string,
    updateMachineryDto: Partial<CreateMachineryDto>,
  ): Promise<Machinery> {
    const machinery = await this.machineryRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!machinery) {
      throw new Error(`Machinery with id ${id} not found`);
    }

    const identificationNumberExist = await this.machineryRepository.findOne({
      where: {
        identificationNumber: updateMachineryDto.identificationNumber,
        deletedAt: null,
      },
    });
    if (identificationNumberExist) {
      throw new BadRequestException(
        'Machinery with this identification number is already in the database.',
      );
    }

    const farmIdExist = await this.machineryRepository.findOne({
      where: { farmId: updateMachineryDto.farmId, deletedAt: null },
    });
    if (!farmIdExist) {
      throw new BadRequestException('Invalid farm id.');
    }

    Object.assign(machinery, updateMachineryDto);
    return await this.machineryRepository.save(machinery);
  }

  async transfer(
    id: string,
    updateMachineryDto: Partial<CreateMachineryDto>,
    farmId: string,
  ): Promise<Machinery> {
    const machinery = await this.machineryRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!machinery) {
      throw new Error(`Machinery with id ${id} not found`);
    }

    const farmIdExist = await this.farmRepository.findOne({
      where: { id: farmId, deletedAt: null },
    });
    if (!farmIdExist) {
      throw new BadRequestException('Invalid farm id.');
    }

    machinery.farmId = farmId;

    Object.assign(machinery, updateMachineryDto);

    return await this.machineryRepository.save(machinery);
  }

  async remove(id: string): Promise<void> {
    await this.machineryRepository.update(id, { deletedAt: new Date() });
  }
}
