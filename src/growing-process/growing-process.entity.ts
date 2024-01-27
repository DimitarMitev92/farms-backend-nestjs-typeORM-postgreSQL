import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsUUID } from 'class-validator';

@Entity()
export class GrowingProcess {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'crop_id' })
  @IsNotEmpty({ message: 'Crop id cannot be empty' })
  @IsUUID()
  cropId: string;

  @Column({ name: 'field_id' })
  @IsNotEmpty({ message: 'Field id cannot be empty' })
  @IsUUID()
  fieldId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
