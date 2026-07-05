export interface Store {
  _id: string;
  owner: string;
  storeName: string;
  description: string;
  address: string;
  phone: string;
  latitude: number | null;
  longitude: number | null;
  logo: string;
  banner: string;
  isActive: boolean;
}
