import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateGrowingProcessDto {
  @IsNotEmpty({ message: 'Crop id cannot be empty' })
  @IsUUID()
  readonly cropId: string;

  @IsNotEmpty({ message: 'Field id cannot be empty' })
  @IsUUID()
  readonly fieldId: string;
}
