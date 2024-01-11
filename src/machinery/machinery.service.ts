import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machinery } from './machinery.entity';

@Injectable()
export class MachineryService {
  constructor(
    @InjectRepository(Machinery)
    private readonly machineryRepository: Repository<Machinery>,
  ) {}

  findAll(): Promise<Machinery[]> {
    return this.machineryRepository.find();
  }

  findOne(id: string): Promise<Machinery> {
    return this.machineryRepository.findOne({ where: { id } });
  }

  async create(farm: Machinery): Promise<Machinery> {
    const newMachinery = this.machineryRepository.create(farm);
    return await this.machineryRepository.save(newMachinery);
  }

  async update(id: string, machinery: Machinery): Promise<Machinery> {
    await this.machineryRepository.update(id, machinery);
    return await this.machineryRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.machineryRepository.update(id, { deletedAt: new Date() });
  }
}
