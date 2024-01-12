import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, QueryFailedError, Repository } from 'typeorm';
import { User, UserRights } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ where: { deletedAt: null } });
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id, deletedAt: null } });
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<string | { statusCode: number; message: string }> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );

      const user = this.userRepository.create(
        Object.assign({}, createUserDto, {
          rights: UserRights.VIEWER,
          password: hashedPassword,
        }) as DeepPartial<User>,
      );

      const returnedUserFromBase = await this.userRepository.save(user);

      const token = jwt.sign(
        {
          id: returnedUserFromBase.id,
          email: returnedUserFromBase.email,
          rights: returnedUserFromBase.rights,
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
      );

      return token;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key')
      ) {
        return { statusCode: 400, message: 'Email already exists' };
      }
      return { statusCode: 500, message: 'Internal Server Error' };
    }
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { email, deletedAt: null },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, rights: user.rights },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );
    return token;
  }
}
