import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Point } from 'geojson';

type JsonbPoint = { type: 'Point'; coordinates: [number, number] };

@Entity()
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @Column({
    type: 'jsonb',
    transformer: {
      to: (value: Point) => ({ type: 'Point', coordinates: value.coordinates }),
      from: (value: JsonbPoint) => ({
        coordinates: value.coordinates,
        type: 'Point',
      }),
    },
  })
  @IsNotEmpty({ message: 'Location cannot be empty' })
  location: JsonbPoint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
