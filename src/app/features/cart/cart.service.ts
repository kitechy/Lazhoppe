import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  addToCart(productId: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      productId,
      quantity: 1,
    });
  }

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  updateQuantity(cartItemId: string, quantity: number) {
    return this.http.put(`${this.apiUrl}/${cartItemId}`, {
      quantity,
    });
  }

  removeFromCart(cartItemId: string) {
    return this.http.delete(`${this.apiUrl}/${cartItemId}`);
  }

  clearCart() {
    return this.http.delete(this.apiUrl);
  }
}
