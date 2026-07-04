import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreApplication } from 'src/app/models/store-application';

@Injectable({
  providedIn: 'root',
})
export class StoreApplicationService {
  private apiUrl = 'http://localhost:3000/api/store-applications';

  constructor(private http: HttpClient) {}

  submitApplication(data: StoreApplication): Observable<StoreApplication> {
    return this.http.post<StoreApplication>(this.apiUrl, data);
  }

  getApplications(): Observable<StoreApplication[]> {
    return this.http.get<StoreApplication[]>(this.apiUrl);
  }

  getApplication(id: string): Observable<StoreApplication> {
    return this.http.get<StoreApplication>(`${this.apiUrl}/${id}`);
  }

  approveApplication(id: string) {
    return this.http.put(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectApplication(id: string, remarks: string) {
    return this.http.put(`${this.apiUrl}/${id}/reject`, {
      remarks,
    });
  }
}
