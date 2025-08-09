import { UUID } from "../types/types.js";

export interface CartItem {
  id: UUID;         
  cartId: UUID;     
  productId: UUID;  
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: UUID;
  userId: UUID;
  createdAt: Date;
  updatedAt: Date;
}