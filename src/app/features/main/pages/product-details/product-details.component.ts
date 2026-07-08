import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../../product/shop.service';
import { CartService } from '../../cart/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Product } from 'src/app/models/product';
import { Store } from 'src/app/models/store';
import { MessageService } from 'src/app/features/messages/services/message.service';
import { StoreService } from 'src/app/features/store-owner/services/store.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product!: Product;
  store?: Store;
  loading = true;
  error: string | null = null;
  quantity = 1;
  showToast = false;
  toastMessage = '';
  private toastTimeout?: ReturnType<typeof setTimeout>;
  backendUrl = 'http://localhost:3000';

  center: google.maps.LatLngLiteral = {
    lat: 13.139,
    lng: 123.743,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private cartService: CartService,
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadProduct(id);
    } else {
      this.error = 'Product ID not found';
      this.loading = false;
    }
  }

  loadProduct(id: string) {
    this.shopService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;

        // Handle store data from product
        if (product.store) {
          if (typeof product.store === 'object') {
            this.store = product.store as Store;

            // Update map center with store coordinates
            if (
              this.store.latitude !== null &&
              this.store.latitude !== undefined &&
              this.store.longitude !== null &&
              this.store.longitude !== undefined
            ) {
              this.center = {
                lat: this.store.latitude,
                lng: this.store.longitude,
              };
            } else {
              console.warn('Store coordinates not available');
            }
          } else {
            console.warn('Store is a string ID, not populated:', product.store);
          }
        } else {
          console.warn('Product has no store information');
        }

        this.loading = false;
        this.error = null;
      },

      error: (err) => {
        console.error('Error loading product:', err);
        this.error = 'Failed to load product details';
        this.loading = false;
      },
    });
  }

  getImageUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl) {
      return 'assets/no-image.png';
    }

    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    return `${this.backendUrl}${imageUrl}`;
  }

  getStoreLogoUrl(logoUrl: string | null | undefined): string {
    if (!logoUrl) {
      return 'assets/default-store-logo.png';
    }

    if (logoUrl.startsWith('http')) {
      return logoUrl;
    }

    return `${this.backendUrl}${logoUrl}`;
  }

  addToCart() {
    if (!this.product) return;

    if (!this.authService.isLoggedIn()) {
      const goToLogin = confirm(
        'You need to log in before adding items to your cart.\n\nGo to Login page?',
      );

      if (goToLogin) {
        this.router.navigate(['/auth']);
      }
      return;
    }

    if (this.quantity > 0 && this.product.stock > 0) {
      this.cartService.addToCart(this.product._id).subscribe({
        next: () => {
          this.toastMessage = `${this.product.name} added to cart`;
          this.showToast = true;

          if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
          }

          this.toastTimeout = setTimeout(() => {
            this.showToast = false;
          }, 2200);
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
          this.toastMessage = 'Failed to add item to cart';
          this.showToast = true;

          if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
          }

          this.toastTimeout = setTimeout(() => {
            this.showToast = false;
          }, 2200);
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/shop']);
  }

  messageStore() {
    if (!this.store) {
      alert('Store information not available.');
      return;
    }

    this.messageService.startConversation(this.store._id).subscribe({
      next: (conversation: any) => {
        this.router.navigate(['/messages'], {
          state: {
            conversationId: conversation._id,
          },
        });
      },
      error: (err) => {
        console.error(err);
        alert('Unable to start conversation.');
      },
    });
  }

  ngOnDestroy() {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }
}
