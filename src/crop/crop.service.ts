import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from './crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
  ) {}

  async findAll(): Promise<Crop[]> {
    return this.cropRepository.find();
  }

  async findOne(id: string): Promise<Crop> {
    return this.cropRepository.findOne({ where: { id } });
  }

  async create(createCropDto: CreateCropDto): Promise<Crop> {
    const crop = new Crop();
    crop.crop = createCropDto.crop;
    return await this.cropRepository.save(crop);
  }

  async update(id: string, updateCropDto: CreateCropDto): Promise<Crop> {
    const crop = await this.cropRepository.findOne({ where: { id } });
    crop.crop = updateCropDto.crop;
    return await this.cropRepository.save(crop);
  }

  async remove(id: string): Promise<void> {
    await this.cropRepository.update(id, { deletedAt: new Date() });
  }
}
