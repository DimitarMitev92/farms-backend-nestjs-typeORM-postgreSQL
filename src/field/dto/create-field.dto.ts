import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFieldDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly boundaries: { type: string; coordinates: number[][] };

  @IsNotEmpty()
  @IsUUID()
  readonly soilId: string;

  @IsNotEmpty()
  @IsUUID()
  readonly farmId: string;
}
