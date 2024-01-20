import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PointDto {
  @IsNotEmpty()
  @Type(() => Number)
  readonly coordinates: [number, number];
}

export class CreateFarmDto {
  @IsNotEmpty({ message: 'Farm name cannot be empty' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'Farm location cannot be empty' })
  @ValidateNested()
  @Type(() => PointDto)
  readonly location: PointDto;
}
