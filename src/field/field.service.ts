import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Field } from './field.entity';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {}

  findAll(): Promise<Field[]> {
    return this.fieldRepository.find();
  }

  findOne(id: string): Promise<Field> {
    return this.fieldRepository.findOne({ where: { id } });
  }

  async create(field: Field): Promise<Field> {
    const newField = this.fieldRepository.create(field);
    return await this.fieldRepository.save(newField);
  }

  async update(id: string, field: Field): Promise<Field> {
    await this.fieldRepository.update(id, field);
    return await this.fieldRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.fieldRepository.delete(id);
  }
}
