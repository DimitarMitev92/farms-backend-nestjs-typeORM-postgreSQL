import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  private readonly blacklist: string[] = [];

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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.passwordHash,
      saltRounds,
    );

    const user = this.userRepository.create(
      Object.assign({}, createUserDto, {
        passwordHash: hashedPassword,
      }) as DeepPartial<User>,
    );

    return await this.userRepository.save(user);
  }

  async update(
    id: string,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.deletedAt = new Date();
    await this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { email, deletedAt: null },
    });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, rights: user.rights },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );

    return token;
  }

  async logout(token: string): Promise<void> {
    this.blacklist.push(token);
  }

  async verifyToken(token: string): Promise<boolean> {
    return !this.blacklist.includes(token);
  }
}
