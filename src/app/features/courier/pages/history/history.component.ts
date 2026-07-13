import { Component, OnInit } from '@angular/core';
import { CourierService } from '../../services/courier.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  orders: any[] = [];
  loading = false;

  backendUrl = 'http://localhost:3000';

  constructor(private courierService: CourierService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;

    this.courierService.getMyDeliveries().subscribe({
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

  updateStatus(order: any, status: string) {
    this.courierService.updateStatus(order._id, status).subscribe({
      next: () => {
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
