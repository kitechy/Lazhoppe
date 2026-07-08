import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(
        catchError((error: HttpErrorResponse | Error) =>
          this.handleError(error),
        ),
      );
  }

  private handleError(error: HttpErrorResponse | Error): Observable<never> {
    let message = 'An unknown error occurred while fetching products.';

    if (error instanceof HttpErrorResponse) {
      if (error.status === 200) {
        const parseError =
          error.error instanceof Error ? error.error.message : '';
        message = parseError
          ? `Invalid JSON response: ${parseError}`
          : 'Received HTTP 200 but the response could not be parsed.';
      } else if (error.error instanceof ErrorEvent) {
        message = `Network error: ${error.error.message}`;
      } else {
        message = `HTTP ${error.status}: ${error.statusText || 'Request failed'}`;
      }
    } else if (error instanceof Error) {
      message = `Response parse error: ${error.message}`;
    }

    console.error('ShopService HTTP error:', error);
    return throwError(() => new Error(message));
  }

  getProduct(id: string | number): Observable<Product> {
    return this.http
      .get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse | Error) =>
          this.handleError(error),
        ),
      );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }
}
