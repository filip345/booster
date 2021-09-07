import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleTypeRoutingModule } from './vehicle-type-routing.module';
import { VehicleTypeListModule } from './vehicle-type-list/vehicle-type-list.module';
import { VehicleTypeListComponent } from './vehicle-type-list/vehicle-type-list.component';

const routes: Routes = [{ path: '', component: VehicleTypeListComponent }];

@NgModule({
  imports: [
    VehicleTypeRoutingModule,
    RouterModule.forChild(routes),
    VehicleTypeListModule,
  ],
})
export class VehicleTypeModule {}
