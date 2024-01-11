import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Field } from './field.entity';
import { CreateFieldDto } from './dto/create-field.dto';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {}

  async findAll(): Promise<Field[]> {
    return this.fieldRepository.find();
  }

  async findOne(id: string): Promise<Field> {
    return this.fieldRepository.findOne({ where: { id } });
  }

  async create(createFieldDto: CreateFieldDto): Promise<Field> {
    const newField = this.fieldRepository.create(createFieldDto);
    return await this.fieldRepository.save(newField);
  }

  async update(
    id: string,
    updateFieldDto: Partial<CreateFieldDto>,
  ): Promise<Field> {
    const field = await this.fieldRepository.findOne({ where: { id } });

    if (!field) {
      throw new Error(`Field with id ${id} not found`);
    }

    Object.assign(field, updateFieldDto);

    return await this.fieldRepository.save(field);
  }

  async remove(id: string): Promise<void> {
    await this.fieldRepository.update(id, { deletedAt: new Date() });
  }
}
