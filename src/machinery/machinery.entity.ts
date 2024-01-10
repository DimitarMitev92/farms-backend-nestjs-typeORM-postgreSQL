import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Farm } from 'src/farm/farm.entity';

@Entity()
export class Machinery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Farm, (farm) => farm.id)
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

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
