import { IsNotEmpty, MinLength, IsString } from 'class-validator';

export class CreateFarmDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  readonly name: string;

  @IsNotEmpty({ message: 'Location cannot be empty' })
  @IsString({ message: 'Location must be a string' })
  readonly location: string;
}
