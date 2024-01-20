import { Get, Param, Post } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRightsDec } from 'src/auth/user-rights.decorator';
import { FarmService } from 'src/farm/farm.service';
import { FieldCountDto } from 'src/field/dto/field-count.dto';
import { FieldSoilDto } from 'src/field/dto/field-soil.dto';
import { FieldService } from 'src/field/field.service';
import { MostMachineriesDto } from 'src/machinery/dto/most-machineries.dto';
import { Machinery } from 'src/machinery/machinery.entity';
import { MachineryService } from 'src/machinery/machinery.service';
import { UserRights } from 'src/user/user.entity';

@Controller('reporting')
export class ReportingController {
  constructor(
    private readonly machineryService: MachineryService,
    private readonly fieldService: FieldService,
    private readonly farmService: FarmService,
  ) {}

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get('field/count')
  getFieldCountByFarmAndCrop(): Promise<FieldCountDto[]> {
    return this.fieldService.getFieldCountByFarmAndCrop();
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get('field/most-common-soil')
  getMostCommonSoil(): Promise<FieldSoilDto[]> {
    return this.fieldService.getMostCommonSoil();
  }

  @UseGuards(AuthGuard)
  @UserRightsDec(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  @Get('farm/most-machineries')
  getMostMachineries(): Promise<MostMachineriesDto[]> {
    return this.machineryService.mostMachineries();
  }
}
