import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getMyProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/mine`);
  }

  createProduct(product: Partial<Product>) {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Partial<Product>) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  toggleStatus(id: string) {
    return this.http.patch(`${this.apiUrl}/${id}/toggle-status`, {});
  }
}
