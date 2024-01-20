import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FarmService } from 'src/farm/farm.service';
import { FieldCountDto } from 'src/field/dto/field-count.dto';
import { FieldSoilDto } from 'src/field/dto/field-soil.dto';
import { FieldService } from 'src/field/field.service';
import { MostMachineriesDto } from 'src/machinery/dto/most-machineries.dto';
import { MachineryService } from 'src/machinery/machinery.service';

@Controller('reporting')
export class ReportingController {
  constructor(
    private readonly machineryService: MachineryService,
    private readonly fieldService: FieldService,
    private readonly farmService: FarmService,
  ) {}

  @Get('field/count')
  getFieldCountByFarmAndCrop(): Promise<FieldCountDto[]> {
    return this.fieldService.getFieldCountByFarmAndCrop();
  }

  @Get('field/most-common-soil')
  getMostCommonSoil(): Promise<FieldSoilDto[]> {
    return this.fieldService.getMostCommonSoil();
  }

  @Get('farm/most-machineries')
  getMostMachineries(): Promise<MostMachineriesDto[]> {
    return this.machineryService.mostMachineries();
  }
}
