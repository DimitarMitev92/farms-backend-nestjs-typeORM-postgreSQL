import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllFarmers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getFarmerById(id: string): Promise<User> {
    const farmer = await this.userRepository.findOne({ where: { id } });

    if (!farmer) {
      throw new NotFoundException(`Farmer with id ${id} not found`);
    }

    return farmer;
  }

  async createFarmer(data: Partial<User>): Promise<User> {
    const farmer = this.userRepository.create(data);
    return this.userRepository.save(farmer);
  }

  async updateFarmer(id: string, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteFarmer(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
