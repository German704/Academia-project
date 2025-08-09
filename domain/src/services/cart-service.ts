import { Cart, CartItem } from "../entities/index.js";

export interface CartService {
  getCart(userId: string): Promise<Cart>;
  addItem(userId: string, productId: string, quantity: number): Promise<void>;
  removeItem(userId: string, productId: string): Promise<void>;
  clearCart(userId: string): Promise<void>;
  getCartItems(userId: string): Promise<CartItem[]>
}