import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCropDto {
  @IsNotEmpty({ message: 'Crop name cannot be empty' })
  @IsString()
  readonly crop: string;
}
