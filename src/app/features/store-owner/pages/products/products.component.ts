import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  editingProduct = false;
  showAddModal = false;
  loading = false;

  selectedProductId = '';

  newProduct = {
    name: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    imageUrl: '',
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
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

    this.newProduct = {
      name: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
      imageUrl: '',
    };
  }

  saveProduct() {
    if (this.editingProduct) {
      this.productService
        .updateProduct(this.selectedProductId, this.newProduct)
        .subscribe({
          next: () => {
            alert('Product updated successfully.');

            this.closeAddModal();
            this.loadProducts();
          },
          error: (err) => {
            console.error(err);
            alert(err.error.message);
          },
        });

      return;
    }

    this.productService.createProduct(this.newProduct).subscribe({
      next: () => {
        alert('Product added successfully.');

        this.closeAddModal();
        this.loadProducts();
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message);
      },
    });
  }

  editProduct(product: Product) {
    this.editingProduct = true;

    this.selectedProductId = product._id;

    this.newProduct = {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
    };

    this.showAddModal = true;
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
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message);
      },
    });
  }
}
