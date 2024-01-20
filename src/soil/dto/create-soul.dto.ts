import { IsNotEmpty } from 'class-validator';

export class CreateSoilDto {
  @IsNotEmpty({ message: 'Soil cannot be empty' })
  readonly soil: string;
}
