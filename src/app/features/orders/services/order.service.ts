import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getMyOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my`);
  }

  getStoreOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/store`);
  }

  updateDeliveryStatus(id: string, status: string) {
    return this.http.patch(`${this.apiUrl}/${id}/delivery-status`, { status });
  }
}
