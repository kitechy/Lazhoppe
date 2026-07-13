import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/api/reviews';

  constructor(private http: HttpClient) {}

  createReview(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getProductReviews(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/${productId}`);
  }

  getMyReviews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my`);
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
