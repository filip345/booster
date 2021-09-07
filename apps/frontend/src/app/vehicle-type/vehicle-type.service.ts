import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleType, VehicleTypeCreate, Page } from '@booster/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleTypeService {
  private readonly baseUrl = '/api/vehicle-type';

  constructor(private readonly http: HttpClient) {}

  getPage(
    searchTerm: string,
    page: number,
    size: number
  ): Observable<Page<VehicleType>> {
    return this.http.get<Page<VehicleType>>(this.baseUrl, {
      params: { searchTerm, page, size },
    });
  }

  create(vehicleType: VehicleTypeCreate): Observable<VehicleType> {
    return this.http.post<VehicleType>(this.baseUrl, vehicleType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
