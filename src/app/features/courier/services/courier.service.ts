import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourierService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  getAvailableOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/available`);
  }

  getMyDeliveries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courier`);
  }

  acceptDelivery(orderId: string) {
    return this.http.patch(`${this.apiUrl}/${orderId}/accept`, {});
  }

  updateStatus(orderId: string, status: string) {
    return this.http.patch(`${this.apiUrl}/${orderId}/delivery-status`, {
      status,
    });
  }
}
