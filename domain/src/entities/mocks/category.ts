import { faker } from "@faker-js/faker";
import { UUID } from "../../types/index.js";
import { Category } from "../product.js";

export function categoryMock(opts?: Partial<Category>): Category {
    return {
            id: faker.string.uuid() as UUID,
            name: faker.commerce.product(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...opts,
        }
}