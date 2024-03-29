import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Machinery } from './machinery.entity';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { Farm } from 'src/farm/farm.entity';
import { MostMachineriesDto } from './dto/most-machineries.dto';
import { FieldCultivation } from 'src/field-cultivation/field-cultivation.entity';

@Injectable()
export class MachineryService {
  constructor(
    @InjectRepository(Machinery)
    private readonly machineryRepository: Repository<Machinery>,
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(FieldCultivation)
    private readonly fieldCultivationRepository: Repository<FieldCultivation>,
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

  async findOne(id: string): Promise<Machinery> {
    return this.checkMachineryExists(id);
  }

  async create(createMachineryDto: CreateMachineryDto): Promise<Machinery> {
    if (!createMachineryDto.brand) {
      throw new BadRequestException('Machinery brand is required.');
    }

    if (!createMachineryDto.model) {
      throw new BadRequestException('Machinery model is required.');
    }

    if (!createMachineryDto.identificationNumber) {
      throw new BadRequestException(
        'Machinery identification number is required.',
      );
    }

    if (!createMachineryDto.farmId) {
      throw new BadRequestException('Farm id is required.');
    }

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
    let machinery = await this.machineryRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!machinery) {
      throw new NotFoundException(`Machinery with id ${id} not found`);
    }

    const identificationNumberExist = await this.machineryRepository.findOne({
      where: {
        identificationNumber: updateMachineryDto.identificationNumber,
        deletedAt: null,
        id: Not(id),
      },
    });
    if (identificationNumberExist) {
      throw new BadRequestException(
        'Machinery with this identification number is already in the database.',
      );
    }

    const farmIdExist = await this.farmRepository.findOne({
      where: { id: updateMachineryDto.farmId, deletedAt: null },
    });
    if (!farmIdExist) {
      throw new BadRequestException('Invalid farm id.');
    }

    const fieldCultivationMachineryUse = await this.fieldCultivationRepository
      .createQueryBuilder('field_cultivation')
      .select(['field_cultivation.machinery_id'])
      .innerJoin(
        Machinery,
        'machinery',
        'machinery.id = field_cultivation.machinery_id',
      )
      .where('machinery.id = :machineryId', { machineryId: id })
      .andWhere('field_cultivation.deletedAt IS NULL')
      .getRawMany();

    if (fieldCultivationMachineryUse.length > 0) {
      throw new BadRequestException('Machinery is in use.');
    }

    machinery = {
      ...machinery,
      ...updateMachineryDto,
    };

    return await this.machineryRepository.save(machinery);
  }

  async remove(id: string): Promise<{ message: string }> {
    const machinery = await this.checkMachineryExists(id);
    const isMachineryHasFieldCultivation =
      await this.fieldCultivationRepository.findOne({
        where: { machineryId: id, deletedAt: null },
      });
    if (isMachineryHasFieldCultivation)
      throw new BadRequestException(
        'Machinery is used. Please first delete field cultivation.',
      );
    await this.machineryRepository.update(machinery.id, {
      deletedAt: new Date(),
    });
    return { message: 'Machinery deleted successfully' };
  }

  async permDelete(id: string): Promise<{ message: string }> {
    const machinery = await this.checkMachineryExists(id);
    const isMachineryHasFieldCultivation =
      await this.fieldCultivationRepository.findOne({
        where: { machineryId: id, deletedAt: null },
      });
    if (isMachineryHasFieldCultivation)
      throw new BadRequestException(
        'Machinery is used. Please first delete field cultivation.',
      );
    await this.machineryRepository.delete(machinery.id);
    return { message: 'Machinery permanently deleted successfully.' };
  }

  async transfer(machineryId: string, farmId: string): Promise<Machinery> {
    const machinery = await this.machineryRepository.findOne({
      where: { id: machineryId, deletedAt: null },
    });
    if (!machinery) {
      throw new NotFoundException(`Machinery with id ${machineryId} not found`);
    }
    const farmIdExist = await this.farmRepository.findOne({
      where: { id: farmId, deletedAt: null },
    });
    if (!farmIdExist) {
      throw new BadRequestException('Invalid farm id.');
    }

    const fieldCultivationMachineryUse = await this.fieldCultivationRepository
      .createQueryBuilder('field_cultivation')
      .select(['field_cultivation.machinery_id'])
      .innerJoin(
        Machinery,
        'machinery',
        'machinery.id = field_cultivation.machinery_id',
      )
      .where('machinery.id = :machineryId', { machineryId: machineryId })
      .andWhere('field_cultivation.deletedAt IS NULL')
      .getRawMany();

    if (fieldCultivationMachineryUse.length > 0) {
      throw new BadRequestException('Machinery is in use.');
    }

    machinery.farmId = farmId;

    return await this.machineryRepository.save(machinery);
  }

  async mostMachineries(): Promise<MostMachineriesDto[]> {
    return this.machineryRepository
      .createQueryBuilder('machinery')
      .select([
        'CAST(COUNT(machinery.id) AS int) AS count',
        'farm.name as name',
        'farm.location as location',
        'farm.id AS farmId',
      ])
      .innerJoin(Farm, 'farm', 'farm.id = machinery.farm_id')
      .groupBy('farm.id')
      .orderBy('count', 'DESC')
      .getRawMany();
  }
}
