import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFarmDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'Location cannot be empty' })
  readonly location: { type: 'Point'; coordinates: [number, number] };
}
