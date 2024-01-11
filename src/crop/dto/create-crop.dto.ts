import { IsNotEmpty } from 'class-validator';

export class CreateCropDto {
  @IsNotEmpty()
  readonly crop: string;
}
