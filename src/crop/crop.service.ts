import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  private async checkCropExists(id: string): Promise<Crop> {
    const crop = await this.cropRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!crop) {
      throw new NotFoundException("Crop with this id doesn't exist");
    }
    return crop;
  }

  async findAll(): Promise<Crop[]> {
    return this.cropRepository.find();
  }

  async findOne(id: string): Promise<Crop> {
    return this.checkCropExists(id);
  }

  async create(createCropDto: CreateCropDto): Promise<Crop> {
    if (!createCropDto.crop) {
      throw new BadRequestException('Crop name is required.');
    }

    const existingCrop = await this.cropRepository.findOne({
      where: { crop: createCropDto.crop, deletedAt: null },
    });
    if (existingCrop) {
      throw new BadRequestException(
        'Crop with this name already exists. Change it!',
      );
    }

    const crop = new Crop();
    crop.crop = createCropDto.crop;

    return await this.cropRepository.save(crop);
  }

  async update(id: string, updateCropDto: CreateCropDto): Promise<Crop> {
    if (!updateCropDto.crop) {
      throw new BadRequestException('Crop name is required.');
    }

    const crop = await this.checkCropExists(id);
    crop.crop = updateCropDto.crop;

    return await this.cropRepository.save(crop);
  }

  async remove(id: string): Promise<{ message: string }> {
    const crop = await this.checkCropExists(id);
    await this.cropRepository.update(crop.id, {
      deletedAt: new Date(),
    });
    return { message: 'Crop deleted successfully.' };
  }

  async permDelete(id: string): Promise<{ message: string }> {
    const crop = await this.checkCropExists(id);
    await this.cropRepository.delete(crop.id);
    return { message: 'Crop permanently deleted successfully.' };
  }
}
