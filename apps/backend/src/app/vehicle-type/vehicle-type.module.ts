import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTypeController } from './vehicle-type.controller';
import { VehicleTypeEntity } from './vehicle-type.entity';
import { VehicleTypeService } from './vehicle-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleTypeEntity])],
  providers: [VehicleTypeService],
  controllers: [VehicleTypeController],
  exports: [VehicleTypeService],
})
export class VehicleTypeModule {}
