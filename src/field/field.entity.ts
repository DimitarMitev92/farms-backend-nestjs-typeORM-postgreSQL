import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Soil } from 'src/soil/soil.entity';
import { Farm } from 'src/farm/farm.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'boundaries' })
  @IsNotEmpty({ message: 'Boundaries cannot be empty' })
  boundaries: string;

  @ManyToOne(() => Soil, (soil) => soil.id)
  @JoinColumn({ name: 'soil_id' })
  @IsUUID()
  soil: Soil;

  @ManyToOne(() => Farm, (farm) => farm.id)
  @JoinColumn({ name: 'farm_id' })
  @IsUUID()
  farm: Farm;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
