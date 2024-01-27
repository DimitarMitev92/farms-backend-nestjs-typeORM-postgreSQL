import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
import { IsNotEmpty, IsUUID } from 'class-validator';

@Entity()
export class Machinery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'farm_id' })
  @IsNotEmpty({ message: 'Farm id cannot be empty' })
  @IsUUID()
  farmId: string;

  @Column()
  @IsNotEmpty({ message: 'Brand cannot be empty' })
  brand: string;

  @Column()
  @IsNotEmpty({ message: 'Model cannot be empty' })
  model: string;

  @Column({ name: 'identification_number' })
  @IsNotEmpty({ message: 'Identification number cannot be empty' })
  identificationNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
