import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsUUID } from 'class-validator';

@Entity()
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @Column()
  @IsNotEmpty({ message: 'Location cannot be empty' })
  location: string;

  @Column({ name: 'user_id' })
  @IsNotEmpty({ message: 'User id cannot be empty' })
  @IsUUID()
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
