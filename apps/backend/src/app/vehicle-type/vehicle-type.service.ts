import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleTypeEntity } from './vehicle-type.entity';
import { VehicleType, VehicleTypeCreate, Page } from '@booster/models';

function toVehicleType(entity: VehicleTypeEntity): VehicleType {
  return entity;
}

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectRepository(VehicleTypeEntity)
    private readonly repo: Repository<VehicleTypeEntity>
  ) {}

  async getPage(
    searchTerm: string,
    page = 0,
    size = 20
  ): Promise<Page<VehicleType>> {
    const [rows, ct] = searchTerm
      ? await this.findAndCountSimilar(searchTerm, page, size)
      : await this.findAllAndCount(page, size);

    return {
      data: rows.map(toVehicleType),
      total: ct,
    };
  }

  async create(vehicleType: VehicleTypeCreate): Promise<VehicleType> {
    const entity = await this.repo.save(vehicleType);
    return toVehicleType(entity);
  }

  async createBatch(vehicleTypes: VehicleTypeCreate[]): Promise<VehicleType[]> {
    const entities = await this.repo.save(vehicleTypes);
    return entities.map(toVehicleType);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  private findAllAndCount(
    page: number,
    size
  ): Promise<[VehicleTypeEntity[], number]> {
    return this.repo.findAndCount({
      take: size,
      skip: page * size,
    });
  }

  private findAndCountSimilar(
    searchTerm: string,
    page: number,
    size: number
  ): Promise<[VehicleTypeEntity[], number]> {
    return this.repo
      .createQueryBuilder('vehicle_type')
      .where(`similarity(vehicle_type.make, :searchTerm) >= 0.2`, {
        searchTerm,
      })
      .orWhere('similarity(vehicle_type.model, :searchTerm) > 0.2', {
        searchTerm,
      })
      .orWhere(
        'similarity(CAST(vehicle_type.year AS TEXT), :searchTerm) > 0.8',
        { searchTerm }
      )
      .take(size)
      .skip(page * size)
      .getManyAndCount();
  }
}
