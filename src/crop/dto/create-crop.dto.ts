import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCropDto {
  @IsNotEmpty({ message: 'Crop name cannot be empty' })
  @MinLength(3, { message: 'Crop name must be at least 3 characters long' })
  readonly crop: string;
}
