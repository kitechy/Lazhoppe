import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from '../../cart/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { loadProducts } from 'src/app/store/products/product.actions';
import { selectProducts } from 'src/app/store/products/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  searchTerm = '';
  errorMessage = '';

  productsPerCategory = 5;

  selectedCategory: string | null = null;

  backendUrl = 'http://localhost:3000';

  toastMessage = '';
  showToast = false;

  private toastTimeout?: ReturnType<typeof setTimeout>;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedCategory = params['category'] || null;
    });

    // Dispatch the action
    this.store.dispatch(loadProducts());

    // Listen to products in the store
    this.store.select(selectProducts).subscribe({
      next: (products) => {
        this.products = products;
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

  get displayedProducts(): Product[] {
    let result = [...this.products];

    if (this.searchTerm) {
      const q = this.searchTerm.toLowerCase();

      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (this.selectedCategory) {
      result = result.filter(
        (p: any) => p.category?.name === this.selectedCategory,
      );
    }

    return result;
  }

  get groupedProducts(): Map<string, Product[]> {
    const grouped = new Map<string, Product[]>();

    this.displayedProducts.forEach((product: any) => {
      const category = product.category?.name || 'Uncategorized';

      if (!grouped.has(category)) {
        grouped.set(category, []);
      }

      grouped.get(category)!.push(product);
    });

    return grouped;
  }

  get categories(): string[] {
    return Array.from(this.groupedProducts.keys());
  }

  getProductsByCategory(category: string): Product[] {
    return this.groupedProducts.get(category) || [];
  }

  getDisplayedProductsByCategory(category: string): Product[] {
    return this.getProductsByCategory(category).slice(
      0,
      this.productsPerCategory,
    );
  }

  hasMoreProducts(category: string): boolean {
    return (
      this.getProductsByCategory(category).length > this.productsPerCategory
    );
  }

  viewAllCategory(category: string): void {
    this.router.navigate(['/shop/category', category]);
  }

  goBackToShop(): void {
    this.router.navigate(['/shop']);
  }

  addToCart(product: Product): void {
    if (!this.authService.isLoggedIn()) {
      const goToLogin = confirm(
        'You need to log in before adding items to your cart.\n\nGo to Login page?',
      );

      if (goToLogin) {
        this.router.navigate(['/auth']);
      }

      return;
    }

    this.cartService.addToCart(product._id).subscribe({
      next: () => {
        this.toastMessage = `${product.name} added to cart`;
        this.showToast = true;

        if (this.toastTimeout) {
          clearTimeout(this.toastTimeout);
        }

        this.toastTimeout = setTimeout(() => {
          this.showToast = false;
        }, 2200);
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
