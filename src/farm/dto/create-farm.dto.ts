import { IsNotEmpty, IsString } from 'class-validator';
export class CreateFarmDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly location: string;
}
