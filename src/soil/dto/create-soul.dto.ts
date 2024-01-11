import { IsNotEmpty } from 'class-validator';

export class CreateSoilDto {
  @IsNotEmpty()
  readonly soil: string;
}
