import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsString,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateFarmDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty({ message: 'Location cannot be empty' })
  @ArrayMinSize(2, { message: 'Location should have at least 2 coordinates' })
  readonly location: number[];
}
