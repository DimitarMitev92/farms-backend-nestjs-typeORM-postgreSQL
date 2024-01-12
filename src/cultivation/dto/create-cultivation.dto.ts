import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCultivationDto {
  @IsNotEmpty({ message: 'Cultivation name cannot be empty' })
  @MinLength(3, {
    message: 'Cultivation name must be at least 3 characters long',
  })
  readonly cultivation: string;
}
