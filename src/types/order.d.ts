import { ProductResType } from "./product";

export interface OrderResType {
  id: string;
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  product: ProductResType;
  quantity: number;
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
  amount: number;
  paymentMethod: "COD" | "UPI";
  documentId: string;
  couponDiscount:number;
  address: {
    city: string;
    state: string;
    country: string;
    district: string;
    streetAddress: string;
    locality: string;
    landmark: string;
    phone: string;
    firstname: string;
    lastname: string;
    verfiedIdentifier: string;
    pincode: number;
  };
}
