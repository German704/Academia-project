import { Status } from "../types/order.js";
import { UUID } from "../types/types.js";

export interface Order {
  id: UUID;         
  userId: UUID;    
  totalAmount: number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
export interface OrderItem {
  id: UUID;         
  orderId: UUID;       
  productId: UUID;     
  quantity: number;
  priceAtPurchase: number; 
  createdAt: Date;
  updatedAt: Date;
}

