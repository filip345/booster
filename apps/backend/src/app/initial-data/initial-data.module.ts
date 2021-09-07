import { Module } from '@nestjs/common';
import { InitialDataService } from '../initial-data/initial-data.service';
import { VehicleTypeModule } from '../vehicle-type/vehicle-type.module';

@Module({
  imports: [VehicleTypeModule],
  providers: [InitialDataService],
})
export class InitialDataModule {}
