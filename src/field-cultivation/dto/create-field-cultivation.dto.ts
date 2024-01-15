import { IsNotEmpty, IsUUID, IsDate } from 'class-validator';

export class CreateFieldCultivationDto {
  @IsNotEmpty()
  @IsUUID()
  readonly cultivationId: string;

  @IsNotEmpty()
  @IsUUID()
  readonly machineryId: string;

  @IsNotEmpty()
  @IsUUID()
  growingPeriodId: string;

  @IsDate()
  startingDate: Date;
}
