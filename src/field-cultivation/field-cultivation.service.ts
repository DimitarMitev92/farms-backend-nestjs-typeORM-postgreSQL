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
import { GrowingPeriod } from 'src/growing-period/growing-period.entity';

@Injectable()
export class FieldCultivationService {
  constructor(
    @InjectRepository(FieldCultivation)
    private readonly fieldCultivationRepository: Repository<FieldCultivation>,
    @InjectRepository(Cultivation)
    private readonly cultivationRepository: Repository<Cultivation>,
    @InjectRepository(Machinery)
    private readonly machineryRepository: Repository<Machinery>,
    @InjectRepository(GrowingPeriod)
    private readonly growingProcessRepository: Repository<GrowingPeriod>,
  ) {}

  private async checkFieldCultivationExists(
    id: string,
  ): Promise<FieldCultivation> {
    const fieldCultivation = await this.fieldCultivationRepository.findOne({
      where: { id },
    });
    if (!fieldCultivation) {
      throw new NotFoundException(
        "Field cultivation with this id doesn't exist",
      );
    }
    return fieldCultivation;
  }

  findAll(): Promise<FieldCultivation[]> {
    return this.fieldCultivationRepository.find();
  }

  findOne(id: string): Promise<FieldCultivation> {
    return this.checkFieldCultivationExists(id);
  }

  async create(
    createFieldCultivationDto: CreateFieldCultivationDto,
  ): Promise<FieldCultivation> {
    const fieldCultivation = new FieldCultivation();
    const cultivationIdExist = await this.cultivationRepository.findOne({
      where: { id: createFieldCultivationDto.cultivationId },
    });
    if (!cultivationIdExist) {
      throw new BadRequestException('Invalid cultivation id.');
    }
    const machineryIdExist = await this.machineryRepository.findOne({
      where: { id: createFieldCultivationDto.machineryId },
    });
    if (!machineryIdExist) {
      throw new BadRequestException('Invalid machinery id.');
    }
    const growingPeriodIdExist = await this.growingProcessRepository.findOne({
      where: { id: createFieldCultivationDto.growingPeriodId },
    });
    if (!growingPeriodIdExist) {
      throw new BadRequestException('Invalid growing period id.');
    }
    fieldCultivation.startingDate = createFieldCultivationDto.startingDate;
    fieldCultivation.cultivationId = createFieldCultivationDto.cultivationId;
    fieldCultivation.machineryId = createFieldCultivationDto.machineryId;
    fieldCultivation.growingPeriodId =
      createFieldCultivationDto.growingPeriodId;
    return await this.fieldCultivationRepository.save(fieldCultivation);
  }

  async update(
    id: string,
    updateFieldCultivationDto: Partial<CreateFieldCultivationDto>,
  ): Promise<FieldCultivation> {
    const fieldCultivation = await this.fieldCultivationRepository.findOne({
      where: { id },
    });
    if (!fieldCultivation) {
      throw new Error(`Field cultivation with id ${id} not found`);
    }

    const cultivationIdExist = await this.cultivationRepository.findOne({
      where: { id: updateFieldCultivationDto.cultivationId },
    });
    if (!cultivationIdExist) {
      throw new BadRequestException('Invalid cultivation id.');
    }

    const machineryIdExist = await this.machineryRepository.findOne({
      where: { id: updateFieldCultivationDto.machineryId },
    });
    if (!machineryIdExist) {
      throw new BadRequestException('Invalid machinery id.');
    }

    const growingPeriodIdExist = await this.growingProcessRepository.findOne({
      where: { id: updateFieldCultivationDto.growingPeriodId },
    });
    if (!growingPeriodIdExist) {
      throw new BadRequestException('Invalid growing period id.');
    }

    Object.assign(fieldCultivation, updateFieldCultivationDto);

    return await this.fieldCultivationRepository.save(fieldCultivation);
  }

  async remove(id: string): Promise<void> {
    await this.fieldCultivationRepository.update(id, { deletedAt: new Date() });
  }
}
