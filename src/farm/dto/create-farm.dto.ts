import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFarmDto {
  @IsNotEmpty({ message: 'Farm name cannot be empty' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'Farm location cannot be empty' })
  readonly location: { type: string; location: number[] };
}
