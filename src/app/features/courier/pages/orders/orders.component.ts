import { Component, OnInit } from '@angular/core';
import { CourierService } from '../../services/courier.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  loading = false;

  backendUrl = 'http://localhost:3000';

  constructor(private courierService: CourierService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;

    this.courierService.getAvailableOrders().subscribe({
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

  accept(orderId: string) {
    if (!confirm('Accept this delivery?')) {
      return;
    }

    this.courierService.acceptDelivery(orderId).subscribe({
      next: () => {
        alert('Delivery accepted.');
        this.loadOrders();
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message);
      },
    });
  }

  getImageUrl(image: string) {
    if (!image) {
      return 'assets/no-image.png';
    }

    if (image.startsWith('http')) {
      return image;
    }

    return `${this.backendUrl}${image}`;
  }
}
