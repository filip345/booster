import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleTypeCreateDialogComponent } from './vehicle-type-create-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [VehicleTypeCreateDialogComponent],
})
export class VehicleTypeCreateDialogModule {}
