import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleTypeListComponent } from './vehicle-type-list/vehicle-type-list.component';

const routes: Routes = [{ path: '', component: VehicleTypeListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleTypeRoutingModule {}
