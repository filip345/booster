import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VehicleType } from '@booster/models';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { NotificationService } from '../../shared/notification.service';
import { VehicleTypeService } from '../vehicle-type.service';

@Component({
  selector: 'app-vehicle-type-create-dialog',
  templateUrl: './vehicle-type-create-dialog.component.html',
  styleUrls: ['./vehicle-type-create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleTypeCreateDialogComponent {
  readonly formGroup = new FormGroup({
    make: new FormControl(null, [Validators.required]),
    model: new FormControl(null, [Validators.required]),
    year: new FormControl(null, [Validators.required, Validators.min(0)]),
  });
  readonly saving$$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly vehicleTypeService: VehicleTypeService,
    private readonly notificationService: NotificationService,
    private readonly dialogRef: MatDialogRef<
      VehicleTypeCreateDialogComponent,
      void
    >
  ) {}

  onSaveClick() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.saving$$.next(true);
    this.vehicleTypeService
      .create(this.formGroup.value as VehicleType)
      .pipe(
        tap(() => {
          this.notificationService.success('Vehicle type created');
          this.dialogRef.close();
        }),
        catchError(() => {
          this.notificationService.error('Failed to create vehicle type');
          return EMPTY;
        }),
        finalize(() => this.saving$$.next(false))
      )
      .subscribe();
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  getYearError(errors: ValidationErrors | null): string {
    if (errors?.required) {
      return 'Required';
    } else if (errors?.min) {
      return 'Must be positive';
    } else {
      return '';
    }
  }
}
