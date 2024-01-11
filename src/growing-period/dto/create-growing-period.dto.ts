import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateGrowingPeriodDto {
  @IsNotEmpty()
  @IsUUID()
  readonly cropId: string;

  @IsNotEmpty()
  @IsUUID()
  readonly fieldId: string;
}
