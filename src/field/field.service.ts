import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Field } from './field.entity';
import { CreateFieldDto } from './dto/create-field.dto';
import { Soil } from 'src/soil/soil.entity';
import { Farm } from 'src/farm/farm.entity';
import { FieldCountDto } from './dto/field-count.dto';
import { Crop } from 'src/crop/crop.entity';
import { GrowingProcess } from 'src/growing-process/growing-process.entity';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
    @InjectRepository(Soil)
    private readonly soilRepository: Repository<Soil>,
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  private async checkFieldExists(id: string): Promise<Field> {
    const field = await this.fieldRepository.findOne({
      where: { id },
    });
    if (!field) {
      throw new NotFoundException("Field with this id doesn't exist");
    }
    return field;
  }

  async findAll(): Promise<Field[]> {
    return this.fieldRepository.find();
  }

  async findOne(id: string): Promise<Field> {
    return this.checkFieldExists(id);
  }

  async create(createFieldDto: CreateFieldDto): Promise<Field> {
    const field = new Field();
    const fieldName = await this.fieldRepository.findOne({
      where: { name: createFieldDto.name },
    });
    if (fieldName) {
      throw new BadRequestException(
        'Field with this name is already exist. Change it!',
      );
    }
    const fieldBoundaries = await this.fieldRepository.findOne({
      where: { boundaries: createFieldDto.boundaries },
    });
    if (fieldBoundaries) {
      throw new BadRequestException(
        'Field with this boundaries is already exist. Change it.',
      );
    }
    const soilIdExist = await this.soilRepository.findOne({
      where: { id: createFieldDto.soilId },
    });
    if (!soilIdExist) {
      throw new BadRequestException('Invalid soil id.');
    }
    const farmIdExist = await this.farmRepository.findOne({
      where: { id: createFieldDto.farmId },
    });
    if (!farmIdExist) {
      throw new BadRequestException('Invalid farm id.');
    }
    field.name = createFieldDto.name;
    field.boundaries = createFieldDto.boundaries;
    field.soilId = createFieldDto.soilId;
    field.farmId = createFieldDto.farmId;
    return await this.fieldRepository.save(field);
  }

  async update(
    id: string,
    updateFieldDto: Partial<CreateFieldDto>,
  ): Promise<Field> {
    const field = await this.fieldRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!field) {
      throw new Error(`Field with id ${id} not found`);
    }

    const soilIdExist = await this.soilRepository.findOne({
      where: { id: updateFieldDto.soilId, deletedAt: null },
    });
    if (!soilIdExist) {
      throw new BadRequestException('Invalid soil id.');
    }
    const farmIdExist = await this.farmRepository.findOne({
      where: { id: updateFieldDto.farmId, deletedAt: null },
    });
    if (!farmIdExist) {
      throw new BadRequestException('Invalid farm id.');
    }

    Object.assign(field, updateFieldDto);

    return await this.fieldRepository.save(field);
  }

  async remove(id: string): Promise<void> {
    await this.fieldRepository.update(id, { deletedAt: new Date() });
  }

  async getFieldCountByFarmAndCrop(): Promise<FieldCountDto[]> {
    return this.fieldRepository
      .createQueryBuilder('field')
      .select([
        'COUNT(field.id) AS fieldId',
        'farm.name AS farmName',
        'crop.crop AS cropName',
      ])
      .innerJoin(Farm, 'farm', 'field.farm_id = farm.id')
      .innerJoin(
        GrowingProcess,
        'growing_process',
        'field.id = growing_process.field_id',
      )
      .innerJoin(Crop, 'crop', 'crop.id = growing_process.crop_id')
      .groupBy('farm.name, crop.crop')
      .getRawMany();
  }

  //   SELECT
  //   count(field.id) AS fieldId,
  //   farm.name AS farmName,
  //   crop.crop AS cropName
  // FROM
  //   field
  // INNER JOIN
  //   farm ON field.farm_id = farm.id
  // INNER JOIN
  // 	growing_process ON field.id = growing_process.field_id
  // INNER JOIN
  // 	crop ON crop.id = growing_process.crop_id
  // GROUP BY
  // 	farm.name, crop.crop
}
