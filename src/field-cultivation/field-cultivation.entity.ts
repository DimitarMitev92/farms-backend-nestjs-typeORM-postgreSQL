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
import { GrowingPeriod } from 'src/growing-period/growing-period.entity';

@Entity()
export class FieldCultivation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cultivation, (cultivation) => cultivation.id)
  @JoinColumn({ name: 'cultivation_id' })
  @IsUUID()
  cultivationId: string;

  @ManyToOne(() => Machinery, (machinery) => machinery.id)
  @JoinColumn({ name: 'machinery_id' })
  @IsUUID()
  machineryId: string;

  @ManyToOne(() => GrowingPeriod, (growingPeriod) => growingPeriod.id)
  @JoinColumn({ name: 'growing_process_id' })
  @IsUUID()
  growingPeriodId: string;

  @Column({ name: 'starting_date' })
  @IsNotEmpty({ message: 'Past or present cannot be empty' })
  startingDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
