import { IsNotEmpty } from 'class-validator';

export class CreateCultivationDto {
  @IsNotEmpty()
  readonly cultivation: string;
}
