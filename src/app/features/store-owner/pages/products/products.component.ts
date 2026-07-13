import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  categories: any[] = [];

  editingProduct = false;
  showAddModal = false;
  loading = false;
  uploadingImage = false;

  selectedProductId = '';
  selectedImage: File | null = null;
  imagePreviewUrl: string | null = null;

  backendUrl = 'http://localhost:3000';

  newProduct = {
    name: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    imageUrl: '',
  };

  constructor(
    private productService: ProductService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories() {
    this.http
      .get<any[]>(`${this.backendUrl}/api/stores/my/categories`)
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        },
        error: console.error,
      });
  }

  openAddModal() {
    this.editingProduct = false;

    this.selectedProductId = '';

    this.newProduct = {
      name: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
      imageUrl: '',
    };

    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.selectedImage = null;
    this.imagePreviewUrl = null;

    this.newProduct = {
      name: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
      imageUrl: '',
    };
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      this.selectedImage = null;
      this.imagePreviewUrl = null;
      return;
    }

    this.selectedImage = input.files[0];
    this.imagePreviewUrl = URL.createObjectURL(this.selectedImage);
  }

  saveProduct() {
    if (this.selectedImage) {
      this.uploadingImage = true;

      this.productService.uploadImage(this.selectedImage).subscribe({
        next: (response) => {
          this.newProduct.imageUrl = response.imageUrl;
          this.saveProductToDatabase();
        },
        error: (err) => {
          console.error(err);
          this.uploadingImage = false;
          alert('Image upload failed.');
        },
      });

      return;
    }

    this.saveProductToDatabase();
  }

  editProduct(product: Product) {
    this.editingProduct = true;

    this.selectedProductId = product._id;
    this.selectedImage = null;

    this.imagePreviewUrl = product.imageUrl
      ? this.getImageUrl(product.imageUrl)
      : null;

    this.newProduct = {
      name: product.name,
      description: product.description,
      category:
        typeof product.category === 'string'
          ? product.category
          : product.category?._id || '',
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
    };

    this.showAddModal = true;
  }

  saveProductToDatabase() {
    if (this.editingProduct) {
      this.productService
        .updateProduct(this.selectedProductId, this.newProduct)
        .subscribe({
          next: () => {
            this.uploadingImage = false;
            this.closeAddModal();
            this.loadProducts();
          },
          error: (err) => {
            console.error(err);
            this.uploadingImage = false;
            alert(err.error.message);
          },
        });

      return;
    }

    this.productService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.uploadingImage = false;
        this.closeAddModal();
        this.loadProducts();
      },
      error: (err) => {
        console.error(err);
        this.uploadingImage = false;
        alert(err.error.message);
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

  loadProducts() {
    this.loading = true;

    this.productService.getMyProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  toggleProductStatus(product: Product) {
    const action = product.isActive ? 'deactivate' : 'activate';

    if (!confirm(`Are you sure you want to ${action} this product?`)) {
      return;
    }

    this.productService.toggleStatus(product._id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => {
        console.error(err);
        alert(err.error.message);
      },
    });
  }
}
