import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMachineryDto {
  @IsNotEmpty()
  @IsUUID()
  farmId: string;

  @IsNotEmpty({ message: 'Brand cannot be empty' })
  brand: string;

  @IsNotEmpty({ message: 'Model cannot be empty' })
  model: string;

  @IsNotEmpty({ message: 'Identification number cannot be empty' })
  identificationNumber: string;
}
