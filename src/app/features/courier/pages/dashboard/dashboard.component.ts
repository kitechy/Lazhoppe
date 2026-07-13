import { Component, OnInit } from '@angular/core';
import { CourierService } from '../../services/courier.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  availableOrders = 0;
  activeDeliveries = 0;
  deliveredOrders = 0;

  recentDeliveries: any[] = [];

  constructor(private courierService: CourierService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.courierService.getAvailableOrders().subscribe({
      next: (orders) => {
        this.availableOrders = orders.length;
      },
    });

    this.courierService.getMyDeliveries().subscribe({
      next: (orders) => {
        this.activeDeliveries = orders.filter(
          (o) => o.status !== 'Delivered',
        ).length;

        this.deliveredOrders = orders.filter(
          (o) => o.status === 'Delivered',
        ).length;

        this.recentDeliveries = orders.slice(0, 5);
      },
    });
  }
}
