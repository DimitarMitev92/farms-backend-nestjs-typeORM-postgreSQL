import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ where: { deletedAt: null } });
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id, deletedAt: null } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email, deletedAt: null },
    });
  }

  async create(data: DeepPartial<User>) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async update(id: string, data: DeepPartial<User>): Promise<User> {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    Object.assign(existingUser, data);

    return await this.userRepository.save(existingUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.deletedAt = new Date();

    await this.userRepository.save(user);
  }
}
