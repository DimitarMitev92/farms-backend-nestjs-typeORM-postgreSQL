import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
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
import { FieldSoilDto } from './dto/field-soil.dto';

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
    try {
      const field = await this.fieldRepository.findOne({
        where: { id },
      });
      if (!field) {
        throw new NotFoundException("Field with this id doesn't exist");
      }
      return field;
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching field data');
    }
  }

  async findAll(): Promise<Field[]> {
    try {
      return this.fieldRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching fields');
    }
  }

  async findOne(id: string): Promise<Field> {
    return this.checkFieldExists(id);
  }

  async create(createFieldDto: CreateFieldDto): Promise<Field> {
    try {
      const field = new Field();
      const fieldName = await this.fieldRepository.findOne({
        where: { name: createFieldDto.name },
      });
      if (fieldName) {
        throw new BadRequestException(
          'Field with this name already exists. Change it!',
        );
      }
      const fieldBoundaries = await this.fieldRepository.findOne({
        where: { boundaries: createFieldDto.boundaries },
      });
      if (fieldBoundaries) {
        throw new BadRequestException(
          'Field with these boundaries already exists. Change them.',
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
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error while creating field');
    }
  }

  async update(
    id: string,
    updateFieldDto: Partial<CreateFieldDto>,
  ): Promise<Field> {
    try {
      const field = await this.fieldRepository.findOne({
        where: { id, deletedAt: null },
      });

      if (!field) {
        throw new NotFoundException(`Field with id ${id} not found`);
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
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error while updating field');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const field = await this.checkFieldExists(id);
      await this.fieldRepository.update(field.id, { deletedAt: new Date() });

      return { message: 'Field deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error while removing field');
    }
  }

  async getFieldCountByFarmAndCrop(): Promise<FieldCountDto[]> {
    try {
      return this.fieldRepository
        .createQueryBuilder('field')
        .select([
          'COUNT(field.id) AS count',
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching field count by farm and crop',
      );
    }
  }

  async getMostCommonSoil(): Promise<FieldSoilDto[]> {
    try {
      return this.fieldRepository
        .createQueryBuilder('field')
        .select(['COUNT(field.id) AS count', 'soil.soil AS soilType'])
        .innerJoin(Soil, 'soil', 'field.soil_id = soil.id')
        .innerJoin(Farm, 'farm', 'farm.id = field.farm_id')
        .groupBy('soil.soil')
        .limit(1)
        .getRawMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching most common soil',
      );
    }
  }
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

// SELECT count(field.id) AS count, soil.soil AS soilType
// FROM
// 	soil
// INNER JOIN
// 	field ON field.soil_id = soil.id
// INNER JOIN
// 	farm ON field.farm_id = farm.id
// GROUP BY soil.soil
// LIMIT 1

// "boundaries": {
//   "type": "POLYGON",
//   "coordinates":
//       [
//       [
//           12.647130489349365,
//           42.50344840114576
//       ],
//       [
//           12.64714390039444,
//           42.50350327460589
//       ],
//       [
//           12.647164016962051,
//           42.50354924963
//       ],
//       [
//           12.647190168499947,
//           42.503586326237695
//       ],
//       [
//           12.647204920649529,
//           42.503630818137964
//       ],
//       [
//           12.647208273410797,
//           42.503683219668744
//       ]
//     ]
// },
