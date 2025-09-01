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
}
