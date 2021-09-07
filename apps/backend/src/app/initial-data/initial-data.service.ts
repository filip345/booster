import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { readFile, access } from 'fs/promises';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';

const VEHICLE_INFO_JSON_PATH = `${__dirname}/assets/VehicleInfo.json`;

@Injectable()
export class InitialDataService implements OnApplicationBootstrap {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV !== 'production') {
      const { total } = await this.vehicleTypeService.getPage('');
      if (total !== 0) return;

      try {
        await access(VEHICLE_INFO_JSON_PATH);
      } catch {
        return;
      }
      const text = await readFile(VEHICLE_INFO_JSON_PATH, 'utf8');
      const vehicleInfos = JSON.parse(text);

      console.log('Initializing database...');

      await Promise.all(
        vehicleInfos.map(({ make, model, year }) => {
          return this.vehicleTypeService.create({
            make,
            model,
            year,
          });
        })
      );

      console.log('Database initialized');
    }
  }
}
