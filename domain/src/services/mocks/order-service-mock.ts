import { UUID } from "crypto";
import { Order, OrderItem } from "../../entities/index.js";
import { OrderService } from "../order-service.js";

export interface MockedOrderService extends OrderService {
  orders: Order[];
  orderItems: OrderItem[];
}

export function orderServiceMock(initialOrders: Order[] = [], initialItems: OrderItem[] = []): MockedOrderService {
  return {
    orders: [...initialOrders],
    orderItems: [...initialItems],

    async createOrder(userId, items, totalAmount) {
      const orderId = crypto.randomUUID();
      const now = new Date();

      const newOrder: Order = {
        id: orderId,
        userId: userId as UUID,
        totalAmount,
        status: "pending",
        createdAt: now,
        updatedAt: now,
      };

      this.orders.push(newOrder);

      for (const item of items) {
        this.orderItems.push({
          id: crypto.randomUUID(),
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: item.priceAtPurchase,
          createdAt: now,
          updatedAt: now,
        });
      }

      return newOrder;
    },

    async getOrdersByUser(userId) {
      return this.orders.filter(order => order.userId === userId);
    },

    async getOrderItems(orderId) {
      return this.orderItems.filter(item => item.orderId === orderId);
    },
  };
}
