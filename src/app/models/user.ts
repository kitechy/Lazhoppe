export interface User {
  _id: string;

  firstName: string;
  lastName: string;
  email: string;

  role: 'customer' | 'store-owner' | 'admin';

  createdAt?: string;
  updatedAt?: string;
}
