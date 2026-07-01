import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem } from 'src/app/models/cart-item';

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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (items) => {
        console.log('Cart items:', items);
        console.log('First item:', items[0]);
        console.log('Cart ID:', items[0]?._id);
        console.log('Product ID:', items[0]?.product?._id);

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
}
