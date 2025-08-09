import { faker } from "@faker-js/faker";
import { UUID } from "../../types/types.js";
import { Order, OrderItem } from "../order.js";
import { Status } from "../../types/order.js";

export function orderMock(opts?: Partial<Order>): Order {
    return {
            id: faker.string.uuid() as UUID,
            userId: faker.string.uuid() as UUID,
            totalAmount: faker.number.int({min: 200, max: 2000}),
            status: Status.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...opts,
        }
}
export function orderItemMock(opts?: Partial<OrderItem>): OrderItem {
    return {
            id: faker.string.uuid() as UUID,
            orderId: faker.string.uuid() as UUID,
            productId: faker.string.uuid() as UUID,
            quantity: faker.number.int({min: 1, max: 30}),
            priceAtPurchase: faker.number.int({min: 50, max: 1500}),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...opts,
        }
}