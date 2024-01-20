import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRights } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      rights: user.rights,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<
    { access_token: string } | { statusCode: number; message: string }
  > {
    const existingUser = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Invalid credentials');
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRound);
    const data = {
      ...createUserDto,
      rights: UserRights.VIEWER,
      password: hashedPassword,
    };
    const returnedUserFromBase = await this.userService.create(data);
    const payload = {
      sub: returnedUserFromBase.id,
      firstName: returnedUserFromBase.firstName,
      lastName: returnedUserFromBase.lastName,
      email: returnedUserFromBase.email,
      rights: returnedUserFromBase.rights,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
