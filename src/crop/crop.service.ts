import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
    try {
      const crop = await this.cropRepository.findOne({
        where: { id, deletedAt: null },
      });
      if (!crop) {
        throw new NotFoundException("Crop with this id doesn't exist");
      }
      return crop;
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching crop data');
    }
  }

  async findAll(): Promise<Crop[]> {
    try {
      return this.cropRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching crops');
    }
  }

  async findOne(id: string): Promise<Crop> {
    return this.checkCropExists(id);
  }

  async create(createCropDto: CreateCropDto): Promise<Crop> {
    try {
      const crop = new Crop();
      const cropName = await this.cropRepository.findOne({
        where: { crop: createCropDto.crop, deletedAt: null },
      });
      if (cropName) {
        throw new BadRequestException(
          'Crop with this name already exists. Change it!',
        );
      }
      crop.crop = createCropDto.crop;
      return await this.cropRepository.save(crop);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error while creating crop');
    }
  }

  async update(id: string, updateCropDto: CreateCropDto): Promise<Crop> {
    try {
      const crop = await this.checkCropExists(id);
      crop.crop = updateCropDto.crop;
      return await this.cropRepository.save(crop);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error while updating crop');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const crop = await this.checkCropExists(id);
      await this.cropRepository.update(crop.id, {
        deletedAt: new Date(),
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error while removing crop');
    }
  }
}
