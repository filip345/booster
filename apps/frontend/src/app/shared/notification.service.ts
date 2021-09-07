import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, undefined, {
      panelClass: 'snack-bar--success',
    });
  }

  error(message: string) {
    this.snackBar.open(message, undefined, { panelClass: 'snack-bar--error' });
  }
}
