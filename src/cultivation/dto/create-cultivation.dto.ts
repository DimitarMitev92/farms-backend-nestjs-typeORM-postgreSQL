import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCultivationDto {
  @IsNotEmpty({ message: 'Cultivation name cannot be empty' })
  @IsString()
  readonly cultivation: string;
}
