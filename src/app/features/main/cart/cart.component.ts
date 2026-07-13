import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem } from 'src/app/models/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal = 0;
  deliveryFee = 75;
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotals();
      },
      error: (err) => console.error(err),
    });
  }

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    this.total = this.subtotal + this.deliveryFee;
  }

  increaseQuantity(item: CartItem): void {
    this.cartService
      .updateQuantity(item._id, item.quantity + 1)
      .subscribe(() => this.loadCart());
  }

  getImageUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl) {
      return 'assets/no-image.png';
    }

    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    return `http://localhost:3000${imageUrl}`;
  }

  decreaseQuantity(item: CartItem): void {
    const quantity = item.quantity - 1;

    if (quantity <= 0) {
      this.removeItem(item._id);
      return;
    }

    this.cartService
      .updateQuantity(item._id, quantity)
      .subscribe(() => this.loadCart());
  }

  removeItem(cartItemId: string): void {
    this.cartService
      .removeFromCart(cartItemId)
      .subscribe(() => this.loadCart());
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
