import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreService } from '../../services/store.service';
import { Product } from 'src/app/models/product';
import { Store } from 'src/app/models/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private storeService: StoreService,
    private authService: AuthService,
  ) {}

  currentUser = this.authService.getCurrentUser();

  store!: Store;

  recentProducts: Product[] = [];

  totalProducts = 0;
  activeProducts = 0;
  inactiveProducts = 0;

  center: google.maps.LatLngLiteral = {
    lat: 13.139,
    lng: 123.743,
  };

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.storeService.getDashboard().subscribe({
      next: (data) => {
        this.store = data.store;

        this.totalProducts = data.stats.totalProducts;

        this.activeProducts = data.stats.activeProducts;

        this.inactiveProducts = data.stats.inactiveProducts;

        this.recentProducts = data.recentProducts;

        if (this.store.latitude && this.store.longitude) {
          this.center = {
            lat: this.store.latitude,
            lng: this.store.longitude,
          };
        }
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
