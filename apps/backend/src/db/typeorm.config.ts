import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { VehicleTypeEntity } from '../app/vehicle-type/vehicle-type.entity';
import { envVars } from '../env-vars';
import { Initial1630967228763 } from './migrations/1630967228763-Initial';

const typeormConfig: ConnectionOptions = {
  type: 'postgres',
  host: envVars.DATABASE_HOST,
  port: envVars.DATABASE_PORT,
  username: envVars.DATABASE_USERNAME,
  password: envVars.DATABASE_PASSWORD,
  database: envVars.DATABASE_NAME,
  entities: [VehicleTypeEntity],
  migrations: [Initial1630967228763],
  cli: {
    migrationsDir: './apps/backend/src/db/migrations',
  },
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export default typeormConfig;
