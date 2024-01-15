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
import { Cultivation } from 'src/cultivation/cultivation.entity';
import { Machinery } from 'src/machinery/machinery.entity';
import { GrowingProcess } from 'src/growing-process/growing-process.entity';

@Entity()
export class FieldCultivation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cultivation, (cultivation) => cultivation.id)
  @JoinColumn({ name: 'cultivation_id' })
  @IsUUID()
  @IsNotEmpty()
  cultivationId: string;

  @ManyToOne(() => Machinery, (machinery) => machinery.id)
  @JoinColumn({ name: 'machinery_id' })
  @IsUUID()
  @IsNotEmpty()
  machineryId: string;

  @ManyToOne(() => GrowingProcess, (growingProcess) => growingProcess.id)
  @JoinColumn({ name: 'growing_process_id' })
  @IsUUID()
  @IsNotEmpty()
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
