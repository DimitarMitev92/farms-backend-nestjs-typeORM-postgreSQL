import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return this.userRepository.find({ where: { deletedAt: null } });
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching users');
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching user');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: { email: email, deletedAt: null },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching user by email',
      );
    }
  }

  async create(data: DeepPartial<User>): Promise<User> {
    try {
      const user = this.userRepository.create(data);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Error while creating user');
    }
  }

  async update(id: string, data: DeepPartial<User>): Promise<User> {
    try {
      const existingUser = await this.findOne(id);
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      Object.assign(existingUser, data);

      return await this.userRepository.save(existingUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error while updating user');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const user = await this.findOne(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.deletedAt = new Date();

      await this.userRepository.save(user);
      return { message: 'User deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error while removing user');
    }
  }
}
