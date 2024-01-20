import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Polygon,
} from 'typeorm';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Soil } from 'src/soil/soil.entity';
import { Farm } from 'src/farm/farm.entity';

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
  boundaries: JsonbPolygon;

  @ManyToOne(() => Soil, (soil) => soil.id)
  @JoinColumn({ name: 'soil_id' })
  @IsUUID()
  soilId: string;

  @ManyToOne(() => Farm, (farm) => farm.id)
  @JoinColumn({ name: 'farm_id' })
  @IsUUID()
  farmId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
