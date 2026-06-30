import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Product[] = [];
  subtotal = 0;
  deliveryFee = 75;
  total = 0;
  private subscription?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscription = this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0,
    );
    this.total = this.subtotal + this.deliveryFee;
  }

  increaseQuantity(item: Product): void {
    this.cartService.addToCart(item);
  }

  decreaseQuantity(item: Product): void {
    const quantity = (item.quantity || 1) - 1;
    this.cartService.updateQuantity(item.id, quantity);
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }
}
