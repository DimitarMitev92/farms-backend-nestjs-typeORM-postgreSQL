import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, QueryFailedError, Repository } from 'typeorm';
import { User, UserRights } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
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

  async register(
    createUserDto: CreateUserDto,
  ): Promise<
    string | { statusCode: number; message: string } | { access_token: string }
  > {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );

      const data = Object.assign({}, createUserDto, {
        rights: UserRights.VIEWER,
        password: hashedPassword,
      }) as DeepPartial<User>;

      const user = this.userRepository.create(data);

      const returnedUserFromBase = await this.userRepository.save(user);

      const payload = {
        id: returnedUserFromBase.id,
        email: returnedUserFromBase.email,
        rights: returnedUserFromBase.rights,
      };

      return { access_token: await this.jwtService.signAsync(payload) };
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
}
