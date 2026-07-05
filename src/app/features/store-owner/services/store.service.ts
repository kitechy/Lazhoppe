import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from 'src/app/models/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = 'http://localhost:3000/api/stores';

  constructor(private http: HttpClient) {}

  getMyStore(): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/me`);
  }

  updateStore(store: Partial<Store>) {
    return this.http.put(`${this.apiUrl}/me`, store);
  }

  getDashboard() {
    return this.http.get<any>('http://localhost:3000/api/stores/dashboard');
  }
}
