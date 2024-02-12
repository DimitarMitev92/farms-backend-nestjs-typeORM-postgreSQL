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
import { User, UserRights } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface LoggingUser {
  firstName: string;
  lastName: string;
  email: string;
  rights: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ user: LoggingUser; access_token: string }> {
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

    const loggedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      rights: user.rights,
    };

    return {
      user: loggedUser,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changePassword({
    email,
    oldPassword,
    newPassword,
  }): Promise<{ user: LoggingUser; access_token: string }> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRound);
    const userData = {
      ...user,
      password: hashedPassword,
    };

    const returnedUserFromBase = await this.userService.update(
      user.id,
      userData,
    );

    const payload = {
      sub: returnedUserFromBase.id,
      firstName: returnedUserFromBase.firstName,
      lastName: returnedUserFromBase.lastName,
      email: returnedUserFromBase.email,
      rights: returnedUserFromBase.rights,
    };

    const loggedUser = {
      firstName: returnedUserFromBase.firstName,
      lastName: returnedUserFromBase.lastName,
      email: returnedUserFromBase.email,
      rights: returnedUserFromBase.rights,
    };

    return {
      user: loggedUser,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<
    | { user: LoggingUser; access_token: string }
    | { statusCode: number; message: string }
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

    const registeredUser = {
      firstName: returnedUserFromBase.firstName,
      lastName: returnedUserFromBase.lastName,
      email: returnedUserFromBase.email,
      rights: returnedUserFromBase.rights,
    };

    return {
      user: registeredUser,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
