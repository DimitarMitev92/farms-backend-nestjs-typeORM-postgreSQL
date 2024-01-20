import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFieldDto {
  @IsNotEmpty({ message: 'Field name cannot be empty' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'Filed boundaries cannot be empty' })
  readonly boundaries: { type: string; coordinates: number[][] };

  @IsNotEmpty({ message: 'Soil id cannot be empty' })
  @IsUUID()
  readonly soilId: string;

  @IsNotEmpty({ message: 'Farm id cannot be empty' })
  @IsUUID()
  readonly farmId: string;
}
