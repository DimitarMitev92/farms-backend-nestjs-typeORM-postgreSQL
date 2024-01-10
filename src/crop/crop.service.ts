import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from './crop.entity';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
  ) {}

  findAll(): Promise<Crop[]> {
    return this.cropRepository.find();
  }

  findOne(id: string): Promise<Crop> {
    return this.cropRepository.findOne({ where: { id } });
  }

  async create(crop: Crop): Promise<Crop> {
    const newCrop = this.cropRepository.create(crop);
    return await this.cropRepository.save(newCrop);
  }

  async update(id: string, crop: Crop): Promise<Crop> {
    await this.cropRepository.update(id, crop);
    return await this.cropRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.cropRepository.delete(id);
  }
}
