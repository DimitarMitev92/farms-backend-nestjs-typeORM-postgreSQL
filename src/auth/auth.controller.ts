import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './public.decorator';

import { LoggingUser } from './auth.service';
import { ChangePasswordDto } from 'src/user/dto/change-password';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(
    @Body() signInDto: CreateUserDto,
  ): Promise<{ user: LoggingUser; access_token: string }> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ user: LoggingUser; access_token: string }> {
    return this.authService.changePassword(changePasswordDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  singUp(
    @Body() signUp: CreateUserDto,
  ): Promise<
    | { user: LoggingUser; access_token: string }
    | { statusCode: number; message: string }
  > {
    return this.authService.signUp(signUp);
  }
}
