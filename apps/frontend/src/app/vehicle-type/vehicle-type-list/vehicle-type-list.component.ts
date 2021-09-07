import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { VehicleTypeService } from '../vehicle-type.service';
import {
  catchError,
  debounceTime,
  startWith,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { EMPTY, merge, Subject } from 'rxjs';
import { NotificationService } from '../../shared/notification.service';
import { VehicleTypeDataSource } from './vehicle-type-data-source';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { VehicleTypeCreateDialogComponent } from '../vehicle-type-create-dialog/vehicle-type-create-dialog.component';

@Component({
  selector: 'app-vehicle-type-list',
  templateUrl: './vehicle-type-list.component.html',
  styleUrls: ['./vehicle-type-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleTypeListComponent implements OnDestroy, AfterViewInit {
  private readonly componentDestroyed$$ = new Subject();

  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  readonly displayedColumns: string[] = ['make', 'model', 'year', 'actions'];
  readonly dataSource = new VehicleTypeDataSource(this.vehicleTypeService);
  readonly searchFC = new FormControl('');

  constructor(
    private readonly vehicleTypeService: VehicleTypeService,
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog
  ) {}

  ngOnDestroy() {
    this.componentDestroyed$$.next();
    this.componentDestroyed$$.complete();
  }

  ngAfterViewInit() {
    merge(
      this.searchFC.valueChanges.pipe(startWith(this.searchFC.value)),
      this.paginator.page
    )
      .pipe(
        debounceTime(100),
        tap(() => this.load()),
        takeUntil(this.componentDestroyed$$)
      )
      .subscribe();
  }

  onCreateClick() {
    this.dialog
      .open(VehicleTypeCreateDialogComponent)
      .afterClosed()
      .pipe(tap(() => this.load()))
      .subscribe();
  }

  onDeleteClick(id: number) {
    this.vehicleTypeService
      .delete(id)
      .pipe(
        tap(() => {
          this.load();
          this.notificationService.success('Vehicle type deleted');
        }),
        catchError(() => {
          this.notificationService.error('Failed to delete vehicle type');
          return EMPTY;
        })
      )
      .subscribe();
  }

  private load() {
    this.dataSource.load(
      this.searchFC.value,
      undefined,
      undefined,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
