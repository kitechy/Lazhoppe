import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShopService } from '../product/shop.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchTerm = '';
  sortOption = '';
  errorMessage = '';
  private sortOptions = [
    '',
    'name-asc',
    'name-desc',
    'price-asc',
    'price-desc',
  ];

  constructor(
    private shopService: ShopService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
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

    switch (this.sortOption) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }

  onSort(option: string) {
    this.sortOption = option;
  }

  toggleSort() {
    const idx = this.sortOptions.indexOf(this.sortOption);
    const next = (idx + 1) % this.sortOptions.length;
    this.sortOption = this.sortOptions[next];
  }

  toastMessage = '';
  showToast = false;
  private toastTimeout?: ReturnType<typeof setTimeout>;

  get sortLabel(): string {
    switch (this.sortOption) {
      case 'name-asc':
        return 'Name A–Z';
      case 'name-desc':
        return 'Name Z–A';
      case 'price-asc':
        return 'Price low→high';
      case 'price-desc':
        return 'Price high→low';
      default:
        return 'Sort';
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.toastMessage = `${product.name} added to cart`;
    this.showToast = true;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
    }, 2200);
  }
}
