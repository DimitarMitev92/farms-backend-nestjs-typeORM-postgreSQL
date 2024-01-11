import { IsNotEmpty } from 'class-validator';

export class CreateFarmDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly location: string;

  @IsNotEmpty()
  readonly userId: string;
}
