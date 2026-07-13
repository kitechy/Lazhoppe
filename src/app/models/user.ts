export interface User {
  _id: string;

  firstName: string;
  lastName: string;
  email: string;
  role: 'customer' | 'store-owner' | 'admin' | 'courier';
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean;
}
