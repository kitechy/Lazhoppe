import { Store } from './store';

export interface Product {
  _id: string;
  store: string | Store;

  name: string;
  description: string;

  price: number;
  stock: number;

  category: string;

  imageUrl: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}
