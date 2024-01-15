import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateGrowingProcessDto {
  @IsNotEmpty()
  @IsUUID()
  readonly cropId: string;

  @IsNotEmpty()
  @IsUUID()
  readonly fieldId: string;
}
