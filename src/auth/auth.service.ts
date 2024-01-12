import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User, UserRights } from 'src/user/user.entity';
import { DeepPartial, QueryFailedError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { id: user.id, email: user.email, rights: user.rights };
    return { access_token: await this.jwtService.signAsync(payload) };
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
      const returnedUserFromBase = await this.userService.create(data);
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
