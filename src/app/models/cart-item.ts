import { Product } from './product';

export interface CartItem {
  _id: string;          // Cart document ID
  user: string;
  product: Product;
  quantity: number;
}