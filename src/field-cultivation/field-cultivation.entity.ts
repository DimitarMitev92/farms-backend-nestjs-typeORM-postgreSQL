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
export class FieldCultivation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cultivation_id' })
  @IsUUID()
  @IsNotEmpty({ message: 'Cultivation id cannot be empty' })
  cultivationId: string;

  @Column({ name: 'machinery_id' })
  @IsUUID()
  @IsNotEmpty({ message: 'Machinery id cannot be empty' })
  machineryId: string;

  @Column({ name: 'growing_process_id' })
  @IsUUID()
  @IsNotEmpty({ message: 'Growing process id cannot be empty' })
  growingProcessId: string;

  @Column({ name: 'starting_date', nullable: true })
  @IsNotEmpty()
  startingDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
