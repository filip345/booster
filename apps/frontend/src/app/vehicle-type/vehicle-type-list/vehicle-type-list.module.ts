import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleTypeListComponent } from './vehicle-type-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { VehicleTypeCreateDialogModule } from '../vehicle-type-create-dialog/vehicle-type-create-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    VehicleTypeCreateDialogModule,
    MatDialogModule,
  ],
  declarations: [VehicleTypeListComponent],
  exports: [VehicleTypeListComponent],
})
export class VehicleTypeListModule {}
