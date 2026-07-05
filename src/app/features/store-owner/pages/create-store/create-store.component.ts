import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Store } from 'src/app/models/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css'],
})
export class CreateStoreComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private router: Router,
  ) {}

  store!: Store;

  ngOnInit() {
    this.loadStore();
  }

  loadStore() {
    this.storeService.getMyStore().subscribe({
      next: (store) => {
        this.store = store;

        if (store.latitude && store.longitude) {
          this.center = {
            lat: store.latitude,
            lng: store.longitude,
          };

          this.markerPosition = {
            lat: store.latitude,
            lng: store.longitude,
          };

          this.latitude = store.latitude;
          this.longitude = store.longitude;
        }
      },
      error: (err) => console.error(err),
    });
  }

  saveStore() {
    this.storeService
      .updateStore({
        latitude: this.latitude,
        longitude: this.longitude,
      })
      .subscribe({
        next: () => {
          alert('Store setup completed!');
          this.router.navigate(['/store-owner/dashboard']);
        },
        error: (err) => console.error(err),
      });
  }

  center: google.maps.LatLngLiteral = {
    lat: 14.5995,
    lng: 120.9842,
  };

  zoom = 13;

  markerPosition: google.maps.LatLngLiteral | null = null;

  latitude = 0;
  longitude = 0;

  mapClicked(event: any) {
    if (!event.latLng) return;

    this.markerPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    this.center = this.markerPosition;

    this.latitude = this.markerPosition.lat;
    this.longitude = this.markerPosition.lng;
  }
}
