import { VehicleType, VehicleTypeCreate, Page } from '@booster/models';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';

@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @Get()
  getPage(
    @Query('searchTerm') searchTerm: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number
  ): Promise<Page<VehicleType>> {
    return this.vehicleTypeService.getPage(searchTerm, page, size);
  }

  @Post()
  create(@Body() vehicleType: VehicleTypeCreate): Promise<VehicleType> {
    return this.vehicleTypeService.create(vehicleType);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.vehicleTypeService.delete(id);
  }
}
