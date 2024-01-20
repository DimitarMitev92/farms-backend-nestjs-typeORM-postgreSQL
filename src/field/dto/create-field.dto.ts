import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';

class BoundariesDto {
  @IsNotEmpty({ message: 'Boundaries cannot be empty' })
  @ArrayMinSize(4, { message: 'Polygon must have at least 4 coordinates' })
  @ArrayNotEmpty({ message: 'Polygon coordinates cannot be empty' })
  coordinates: number[][][];
}

export class CreateFieldDto {
  @IsNotEmpty({ message: 'Field name cannot be empty' })
  @IsString()
  readonly name: string;

  @IsObject()
  @IsNotEmpty()
  readonly boundaries: BoundariesDto;

  @IsNotEmpty({ message: 'Soil id cannot be empty' })
  @IsUUID()
  readonly soilId: string;

  @IsNotEmpty({ message: 'Farm id cannot be empty' })
  @IsUUID()
  readonly farmId: string;
}
