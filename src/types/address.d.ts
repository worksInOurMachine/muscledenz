export interface AddressType {
  city: string;
  pincode: number | string;
  country: string;
  district: string;
  state: string;
  streetAddress: string;
  locality: string;
  landmark: string;
  phone: string;
  documentId?: string;
  id: string;
  firstname: string;
  lastname: string;
  createdAt?: string;
  updatedAt?: string;
}
