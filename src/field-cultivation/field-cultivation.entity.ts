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
import { IsNotEmpty } from 'class-validator';
import { Crop } from 'src/crop/crop.entity';
import { Field } from 'src/field/field.entity';
import { Cultivation } from 'src/cultivation/cultivation.entity';

@Entity()
export class FieldCultivation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cultivation, (cultivation) => cultivation.id)
  @JoinColumn({ name: 'cultivation_id' })
  cultivation: Cultivation;

  @ManyToOne(() => Field, (field) => field.id)
  @JoinColumn({ name: 'field_id' })
  field: Field;

  @ManyToOne(() => Crop, (crop) => crop.id)
  @JoinColumn({ name: 'crop_id' })
  crop: Crop;

  @Column({ type: 'enum', enum: ['past', 'present'], name: 'past_or_present' })
  @IsNotEmpty({ message: 'Past or present cannot be empty' })
  pastOrPresent: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
