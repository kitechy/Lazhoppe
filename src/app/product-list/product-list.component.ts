import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShopService } from '../product/shop.service';

import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../features/cart/cart.service';
import { AuthService } from '../core/services/auth-service';

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
  

  constructor(
    private shopService: ShopService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      } else {
        this.selectedCategory = null;
      }
    });

    this.shopService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        this.errorMessage = error?.message || 'Unable to load products.';
        console.error('Failed to load products:', error);
      },
    });
  }

  get displayedProducts(): Product[] {
    let result = this.products.slice();

    if (this.searchTerm) {
      const q = this.searchTerm.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (this.selectedCategory) {
      result = result.filter((p) => p.category === this.selectedCategory);
    }

    return result;
  }

  get groupedProducts(): Map<string, Product[]> {
    const grouped = new Map<string, Product[]>();
    const filtered = this.displayedProducts;

    filtered.forEach((product) => {
      const category = product.category || 'Uncategorized';
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
    const products = this.getProductsByCategory(category);
    return products.slice(0, this.productsPerCategory);
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

  toastMessage = '';
  showToast = false;
  private toastTimeout?: ReturnType<typeof setTimeout>;

  addToCart(product: Product): void {

  if (!this.authService.isLoggedIn()) {

    const goToLogin = confirm(
      'You need to log in before adding items to your cart.\n\nGo to Login page?'
    );

    if (goToLogin) {
      this.router.navigate(['/login']);
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
    }
  });
}
}
