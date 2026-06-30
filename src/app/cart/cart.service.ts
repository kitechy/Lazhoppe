import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product) {
    const existing = this.cartItems.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(id: number, quantity: number) {
    const existing = this.cartItems.find((item) => item.id === id);
    if (!existing) {
      return;
    }

    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }

    existing.quantity = quantity;
    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
    this.cartSubject.next([...this.cartItems]);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
  }
}
