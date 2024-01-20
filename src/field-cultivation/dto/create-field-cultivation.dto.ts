import { IsNotEmpty, IsUUID, IsDate } from 'class-validator';

export class CreateFieldCultivationDto {
  @IsNotEmpty({ message: 'Cultivation id cannot be empty' })
  @IsUUID()
  readonly cultivationId: string;

  @IsNotEmpty({ message: 'Machinery id cannot be empty' })
  @IsUUID()
  readonly machineryId: string;

  @IsNotEmpty({ message: 'Growing process id cannot be empty' })
  @IsUUID()
  growingProcessId: string;

  @IsDate()
  startingDate: Date;
}
