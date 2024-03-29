import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FieldCultivation } from './field-cultivation.entity';
import { Cultivation } from 'src/cultivation/cultivation.entity';
import { Machinery } from 'src/machinery/machinery.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFieldCultivationDto } from './dto/create-field-cultivation.dto';
import { GrowingProcess } from 'src/growing-process/growing-process.entity';
import { Farm } from 'src/farm/farm.entity';
import { Field } from 'src/field/field.entity';

@Injectable()
export class FieldCultivationService {
  constructor(
    @InjectRepository(FieldCultivation)
    private readonly fieldCultivationRepository: Repository<FieldCultivation>,
    @InjectRepository(Cultivation)
    private readonly cultivationRepository: Repository<Cultivation>,
    @InjectRepository(Machinery)
    private readonly machineryRepository: Repository<Machinery>,
    @InjectRepository(GrowingProcess)
    private readonly growingProcessRepository: Repository<GrowingProcess>,
  ) {}

  private async checkFieldCultivationExists(
    id: string,
  ): Promise<FieldCultivation> {
    const fieldCultivation = await this.fieldCultivationRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!fieldCultivation) {
      throw new NotFoundException(
        "Field cultivation with this id doesn't exist",
      );
    }
    return fieldCultivation;
  }

  async findAll(): Promise<FieldCultivation[]> {
    return this.fieldCultivationRepository.find();
  }

  async findOne(id: string): Promise<FieldCultivation> {
    return this.checkFieldCultivationExists(id);
  }

  async findMachineryByFieldId(fieldId: string) {
    const machineries = await this.machineryRepository
      .createQueryBuilder('machinery')
      .select([
        'machinery.id , machinery.brand,machinery.model,machinery.identification_number',
      ])
      .innerJoin(Farm, 'farm', 'farm.id = machinery.farm_id')
      .innerJoin(Field, 'field', 'field.farm_id = farm.id')
      .where('field.id =:fieldId', {
        fieldId: fieldId,
      })
      .getRawMany();

    return machineries;
  }

  async create(
    createFieldCultivationDto: CreateFieldCultivationDto,
  ): Promise<FieldCultivation> {
    if (!createFieldCultivationDto.cultivationId) {
      throw new BadRequestException('Cultivation id is required.');
    }

    if (!createFieldCultivationDto.growingProcessId) {
      throw new BadRequestException('Growing process id is required.');
    }

    if (!createFieldCultivationDto.machineryId) {
      throw new BadRequestException('Machinery id is required.');
    }

    const fieldCultivation = new FieldCultivation();
    const cultivationIdExist = await this.cultivationRepository.findOne({
      where: { id: createFieldCultivationDto.cultivationId, deletedAt: null },
    });
    if (!cultivationIdExist) {
      throw new BadRequestException('Invalid cultivation id.');
    }
    const machineryIdExist = await this.machineryRepository.findOne({
      where: { id: createFieldCultivationDto.machineryId, deletedAt: null },
    });
    if (!machineryIdExist) {
      throw new BadRequestException('Invalid machinery id.');
    }
    const growingProcessIdExist = await this.growingProcessRepository.findOne({
      where: {
        id: createFieldCultivationDto.growingProcessId,
        deletedAt: null,
      },
    });
    if (!growingProcessIdExist) {
      throw new BadRequestException('Invalid growing process id.');
    }
    fieldCultivation.startingDate = createFieldCultivationDto.startingDate;
    fieldCultivation.cultivationId = createFieldCultivationDto.cultivationId;
    fieldCultivation.machineryId = createFieldCultivationDto.machineryId;
    fieldCultivation.growingProcessId =
      createFieldCultivationDto.growingProcessId;
    return await this.fieldCultivationRepository.save(fieldCultivation);
  }

  async update(
    id: string,
    updateFieldCultivationDto: Partial<CreateFieldCultivationDto>,
  ): Promise<FieldCultivation> {
    let fieldCultivation = await this.fieldCultivationRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!fieldCultivation) {
      throw new NotFoundException(`Field cultivation with id ${id} not found`);
    }

    const cultivationIdExist = await this.cultivationRepository.findOne({
      where: { id: updateFieldCultivationDto.cultivationId, deletedAt: null },
    });
    if (!cultivationIdExist) {
      throw new BadRequestException('Invalid cultivation id.');
    }

    const machineryIdExist = await this.machineryRepository.findOne({
      where: { id: updateFieldCultivationDto.machineryId, deletedAt: null },
    });
    if (!machineryIdExist) {
      throw new BadRequestException('Invalid machinery id.');
    }

    const growingProcessIdExist = await this.growingProcessRepository.findOne({
      where: {
        id: updateFieldCultivationDto.growingProcessId,
        deletedAt: null,
      },
    });
    if (!growingProcessIdExist) {
      throw new BadRequestException('Invalid growing process id.');
    }

    fieldCultivation = {
      ...fieldCultivation,
      ...updateFieldCultivationDto,
    };

    return await this.fieldCultivationRepository.save(fieldCultivation);
  }

  async remove(id: string): Promise<{ message: string }> {
    const fieldCultivation = await this.checkFieldCultivationExists(id);
    await this.fieldCultivationRepository.update(fieldCultivation.id, {
      deletedAt: new Date(),
    });

    await this.growingProcessRepository.update(
      fieldCultivation.growingProcessId,
      { deletedAt: new Date() },
    );

    return { message: 'Field cultivation deleted successfully' };
  }

  async permDelete(id: string): Promise<{ message: string }> {
    const fieldCultivation = await this.checkFieldCultivationExists(id);
    await this.fieldCultivationRepository.delete(fieldCultivation.id);
    await this.growingProcessRepository.delete(
      fieldCultivation.growingProcessId,
    );
    return { message: 'Field cultivation permanently deleted successfully.' };
  }
}
