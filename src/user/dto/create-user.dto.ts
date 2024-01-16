import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRights } from '../user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsEnum(UserRights, { message: 'Invalid user rights' })
  readonly rights: UserRights;
}
