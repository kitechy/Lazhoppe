import { Product } from './product';
import { Store } from './store';
import { User } from './user';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Shipping {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  _id: string;

  customer: User;

  store: Store;

  courier?: User;

  items: OrderItem[];

  shipping: Shipping;

  paymentMethod: string;

  subtotal: number;

  deliveryFee: number;

  total: number;

  status: string;

  notes: string;

  createdAt: string;

  updatedAt: string;
}
