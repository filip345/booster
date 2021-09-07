import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from '../db/typeorm.config';
import { InitialDataModule } from './initial-data/initial-data.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    VehicleTypeModule,
    InitialDataModule,
  ],
})
export class AppModule {}
