import { faker } from "@faker-js/faker";
import { UUID } from "../../types/index.js";
import { Cart, CartItem } from "../cart.js";

export function cartItemMock(opts?: Partial<CartItem>): CartItem {
    return {
            id: faker.string.uuid() as UUID,
            cartId: faker.string.uuid() as UUID,
            productId: faker.string.uuid() as UUID,
            quantity: faker.number.int({min: 100, max: 2000}),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...opts,
        }
}
export function cartMock(opts?: Partial<Cart>): Cart {
    return {
            id: faker.string.uuid() as UUID,
            userId: faker.string.uuid() as UUID,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...opts,
        }
}