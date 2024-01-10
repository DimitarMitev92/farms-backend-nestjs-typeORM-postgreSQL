import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string;

  @Column({ name: 'first_name' })
  @IsNotEmpty({ message: 'First name cannot be empty' })
  firstName: string;

  @Column({ name: 'last_name' })
  @IsNotEmpty({ message: 'Last name cannot be empty' })
  lastName: string;

  @Column()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Column({ name: 'password_hash' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: ['OWNER', 'OPERATOR', 'VIEWER'],
    default: 'VIEWER',
  })
  @IsNotEmpty({ message: 'Rights must be OWNER, OPERATOR or VIEWER' })
  rights: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
