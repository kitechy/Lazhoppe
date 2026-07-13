import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/features/orders/services/order.service';
import { Order } from 'src/app/models/order';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  loading = true;

  backendUrl = 'http://localhost:3000';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getStoreOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  updateStatus(order: Order, status: string) {
    this.orderService.updateStatus(order._id, status).subscribe({
      next: () => {
        order.status = status;
      },
      error: console.error,
    });
  }

  getImageUrl(image: string | undefined) {
    if (!image) return 'assets/no-image.png';

    if (image.startsWith('http')) return image;

    return this.backendUrl + image;
  }
}
