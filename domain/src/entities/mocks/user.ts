import { faker } from "@faker-js/faker";
import { User } from "../user.js";
import { UUID } from "../../types/index.js";
import { UserRole } from "../../types/index.js";

export function userMock(opts?: Partial<User>): User {
    return {
            id: faker.string.uuid() as UUID,
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password(),
            role: UserRole.CLIENT,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...opts,
        }
}