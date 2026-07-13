import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/features/main/cart/cart.service';
import { OrderService } from 'src/app/features/orders/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];

  shipping = {
    fullName: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
  };

  paymentMethod = 'Cash on Delivery';

  subtotal = 0;
  deliveryFee = 50;
  total = 0;

  placingOrder = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (items: any[]) => {
        this.cartItems = items;

        this.subtotal = items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        );

        this.total = this.subtotal + this.deliveryFee;
      },
      error: console.error,
    });
  }

  placeOrder() {
    if (this.placingOrder) return;

    this.placingOrder = true;

    this.orderService
      .placeOrder({
        shipping: this.shipping,
        paymentMethod: this.paymentMethod,
      })
      .subscribe({
        next: () => {
          alert('Order placed successfully!');

          this.router.navigate(['/orders']);
        },
        error: (err) => {
          console.error(err);
          this.placingOrder = false;
          alert(err.error.message);
        },
      });
  }
}
