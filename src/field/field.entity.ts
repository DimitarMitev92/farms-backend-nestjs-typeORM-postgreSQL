import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Polygon,
} from 'typeorm';
import { IsNotEmpty, IsUUID } from 'class-validator';

type JsonbPolygon = { type: 'Polygon'; coordinates: number[][][] };

@Entity()
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @Column({
    type: 'jsonb',
    transformer: {
      to: (value: Polygon) => ({
        type: 'Polygon',
        coordinates: value.coordinates,
      }),
      from: (value: JsonbPolygon) => ({
        coordinates: value.coordinates,
        type: 'Polygon',
      }),
    },
  })
  @IsNotEmpty({ message: 'Boundaries cannot be empty' })
  boundaries: JsonbPolygon;

  @Column({ name: 'soil_id', nullable: false })
  @IsNotEmpty({ message: 'Soil id cannot be empty' })
  @IsUUID()
  soilId: string;

  @Column({ name: 'farm_id', nullable: false })
  @IsNotEmpty({ message: 'Farm id cannot be empty' })
  @IsUUID()
  farmId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
