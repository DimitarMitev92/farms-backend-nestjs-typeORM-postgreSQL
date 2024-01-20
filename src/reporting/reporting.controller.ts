import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { FarmService } from 'src/farm/farm.service';
import { FieldCountDto } from 'src/field/dto/field-count.dto';
import { FieldSoilDto } from 'src/field/dto/field-soil.dto';
import { FieldService } from 'src/field/field.service';
import { MostMachineriesDto } from 'src/machinery/dto/most-machineries.dto';
import { MachineryService } from 'src/machinery/machinery.service';
import { UserRights } from 'src/user/user.entity';

@Controller('reporting')
export class ReportingController {
  constructor(
    private readonly machineryService: MachineryService,
    private readonly fieldService: FieldService,
    private readonly farmService: FarmService,
  ) {}

  @Get('field/count')
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  getFieldCountByFarmAndCrop(): Promise<FieldCountDto[]> {
    return this.fieldService.getFieldCountByFarmAndCrop();
  }

  @Get('field/most-common-soil')
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  getMostCommonSoil(): Promise<FieldSoilDto[]> {
    return this.fieldService.getMostCommonSoil();
  }

  @Get('farm/most-machineries')
  @Roles([UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER])
  getMostMachineries(): Promise<MostMachineriesDto[]> {
    return this.machineryService.mostMachineries();
  }
}
