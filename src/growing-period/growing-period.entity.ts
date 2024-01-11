import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Crop } from 'src/crop/crop.entity';
import { Field } from 'src/field/field.entity';

@Entity()
export class GrowingPeriod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @ManyToOne(() => Crop, (crop) => crop.id)
  @JoinColumn({ name: 'crop_id' })
  @IsUUID()
  cropId: string;

  @IsNotEmpty()
  @ManyToOne(() => Field, (field) => field.id)
  @JoinColumn({ name: 'field_id' })
  @IsUUID()
  fieldId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
