import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machinery } from './machinery.entity';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { Farm } from 'src/farm/farm.entity';
import { MostMachineriesDto } from './dto/most-machineries.dto';

@Injectable()
export class MachineryService {
  constructor(
    @InjectRepository(Machinery)
    private readonly machineryRepository: Repository<Machinery>,
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  private async checkMachineryExists(id: string): Promise<Machinery> {
    try {
      const machinery = await this.machineryRepository.findOne({
        where: { id, deletedAt: null },
      });
      if (!machinery) {
        throw new NotFoundException("Machinery with this id doesn't exist");
      }
      return machinery;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching machinery data',
      );
    }
  }

  findAll(): Promise<Machinery[]> {
    try {
      return this.machineryRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching machineries',
      );
    }
  }

  async findOne(id: string): Promise<Machinery> {
    return this.checkMachineryExists(id);
  }

  async create(createMachineryDto: CreateMachineryDto): Promise<Machinery> {
    try {
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
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error while creating machinery');
    }
  }

  async update(
    id: string,
    updateMachineryDto: Partial<CreateMachineryDto>,
  ): Promise<Machinery> {
    try {
      const machinery = await this.machineryRepository.findOne({
        where: { id, deletedAt: null },
      });
      if (!machinery) {
        throw new NotFoundException(`Machinery with id ${id} not found`);
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
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error while updating machinery');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const machinery = await this.checkMachineryExists(id);
      await this.machineryRepository.update(machinery.id, {
        deletedAt: new Date(),
      });
      return { message: 'Machinery deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error while removing machinery');
    }
  }

  async transfer(
    id: string,
    updateMachineryDto: Partial<CreateMachineryDto>,
    farmId: string,
  ): Promise<Machinery> {
    try {
      const machinery = await this.machineryRepository.findOne({
        where: { id, deletedAt: null },
      });
      if (!machinery) {
        throw new NotFoundException(`Machinery with id ${id} not found`);
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
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error while transferring machinery',
      );
    }
  }

  async mostMachineries(): Promise<MostMachineriesDto[]> {
    try {
      return this.machineryRepository
        .createQueryBuilder('machinery')
        .select([
          'COUNT(machinery.id) AS countMachinery',
          'farm.name AS farmName',
        ])
        .innerJoin(Farm, 'farm', 'farm.id = machinery.farm_id')
        .groupBy('farm.name')
        .orderBy('countMachinery', 'DESC')
        .getRawMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching most machineries',
      );
    }
  }
}
