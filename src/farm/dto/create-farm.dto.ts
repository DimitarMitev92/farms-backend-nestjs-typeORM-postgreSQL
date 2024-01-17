import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFarmDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  readonly location: { type: string; location: number[] };
}
