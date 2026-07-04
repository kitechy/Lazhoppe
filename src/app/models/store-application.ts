import { User } from "./user";

export interface StoreApplication {
  _id?: string;

  user?: User;

  storeName: string;

  description: string;

  address: string;

  phone: string;

  status?: "pending" | "approved" | "rejected";

  remarks?: string;

  createdAt?: string;

  updatedAt?: string;
}