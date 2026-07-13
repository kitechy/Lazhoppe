import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
})
export class StoresComponent implements OnInit {
  stores: any[] = [];
  categories: any[] = [];

  loading = true;

  showModal = false;

  selectedStore: any = null;

  selectedCategories: string[] = [];

  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStores();
    this.loadCategories();
  }

  loadStores() {
    this.http.get<any[]>(`${this.api}/stores`).subscribe({
      next: (stores) => {
        this.stores = stores;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  loadCategories() {
    this.http.get<any[]>(`${this.api}/categories`).subscribe({
      next: (categories) => {
        this.categories = categories.filter((c) => c.isActive);
      },
      error: console.error,
    });
  }

  openAssignModal(store: any) {
    this.selectedStore = store;

    this.selectedCategories = store.allowedCategories.map(
      (c: any) => c._id,
    );

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedStore = null;
    this.selectedCategories = [];
  }

  toggleCategory(id: string) {
    if (this.selectedCategories.includes(id)) {
      this.selectedCategories = this.selectedCategories.filter(
        (x) => x !== id,
      );
    } else {
      this.selectedCategories.push(id);
    }
  }

  saveCategories() {
    this.http
      .put(`${this.api}/stores/${this.selectedStore._id}/categories`, {
        categories: this.selectedCategories,
      })
      .subscribe({
        next: () => {
          alert('Categories assigned successfully.');

          this.closeModal();

          this.loadStores();
        },
        error: (err) => {
          console.error(err);

          alert(err.error.message);
        },
      });
  }
}