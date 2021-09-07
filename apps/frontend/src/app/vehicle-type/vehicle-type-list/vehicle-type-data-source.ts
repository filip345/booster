import { DataSource } from '@angular/cdk/collections';
import { VehicleType } from '@booster/models';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { VehicleTypeService } from '../vehicle-type.service';

export class VehicleTypeDataSource implements DataSource<VehicleType> {
  private readonly vehicleTypes$$ = new BehaviorSubject<VehicleType[]>([]);
  private readonly total$$ = new BehaviorSubject<number>(0);
  private readonly loading$$ = new BehaviorSubject<boolean>(true);

  public readonly total$ = this.total$$.asObservable();
  public readonly loading$ = this.loading$$.asObservable();

  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  connect(): Observable<VehicleType[]> {
    return this.vehicleTypes$$.asObservable();
  }

  disconnect(): void {
    this.vehicleTypes$$.complete();
    this.total$$.complete();
    this.loading$$.complete();
  }

  load(
    searchTerm: string,
    filter?: string,
    sortDirection?: string,
    pageIndex: number = 0,
    pageSize: number = 20
  ) {
    console.log('load', searchTerm, filter, sortDirection, pageIndex, pageSize);

    this.loading$$.next(true);
    this.vehicleTypeService
      .getPage(searchTerm, pageIndex, pageSize)
      .pipe(
        catchError(() => EMPTY),
        tap(({ data, total }) => {
          this.vehicleTypes$$.next(data);
          this.total$$.next(total);
        }),
        finalize(() => this.loading$$.next(false))
      )
      .subscribe();
  }
}
