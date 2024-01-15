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
      where: { id },
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
    const crop = new Crop();
    const cropName = await this.cropRepository.findOne({
      where: { crop: createCropDto.crop },
    });
    if (cropName) {
      throw new BadRequestException(
        'Crop with this name is already exist. Change it!',
      );
    }
    crop.crop = createCropDto.crop;
    return await this.cropRepository.save(crop);
  }

  async update(id: string, updateCropDto: CreateCropDto): Promise<Crop> {
    const crop = await this.checkCropExists(id);
    crop.crop = updateCropDto.crop;
    return await this.cropRepository.save(crop);
  }

  async remove(id: string): Promise<void> {
    const crop = await this.checkCropExists(id);
    await this.cropRepository.update(crop.id, {
      deletedAt: new Date(),
    });
  }
}
