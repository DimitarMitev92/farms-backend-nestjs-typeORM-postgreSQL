import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

//ZOD Schema
import { envSchema } from './zod/env-schema';

//User
import { UserModule } from './user/user.module';
import { dbdatasource } from '../db/data.source';
import { SoilModule } from './soil/soil.module';
import { CropModule } from './crop/crop.module';
import { FieldCultivationModule } from './field-cultivation/field-cultivation.module';
import { FarmModule } from './farm/farm.module';
import { MachineryModule } from './machinery/machinery.module';
import { FieldModule } from './field/field.module';
import { CultivationModule } from './cultivation/cultivation.module';
import { GrowingPeriodModule } from './growing-period/growing-period.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbdatasource),
    UserModule,
    SoilModule,
    CropModule,
    FieldCultivationModule,
    FarmModule,
    MachineryModule,
    FieldModule,
    CultivationModule,
    GrowingPeriodModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
