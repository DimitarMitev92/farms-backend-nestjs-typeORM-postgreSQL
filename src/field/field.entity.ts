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
import { Crop } from 'src/crop/crop.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

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

  @ManyToOne(() => Crop, (crop) => crop.id)
  @JoinColumn({ name: 'crop_id' })
  @IsUUID()
  crop: Crop;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
