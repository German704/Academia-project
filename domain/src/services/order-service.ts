import { Order, OrderItem } from "../entities/index.js";

export interface OrderService {
  createOrder(userId: string, items: Omit<OrderItem, "id" | "orderId" | "createdAt" | "updatedAt">[], totalAmount: number): Promise<Order>;
  getOrdersByUser(userId: string): Promise<Order[]>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;
}