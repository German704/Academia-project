import { faker } from "@faker-js/faker";
import { Product } from "../product.js";
import { UUID } from "../../types/types.js";

export function productMock(opts?: Partial<Product>): Product {
    return {
            id: faker.string.uuid() as UUID,
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            category: faker.commerce.product(),
            price: faker.number.int({min: 50, max: 1500}),
            stock: faker.number.int({min: 50, max: 200}),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...opts,
        }
}