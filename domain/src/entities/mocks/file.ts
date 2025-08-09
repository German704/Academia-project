import { faker } from "@faker-js/faker";
import { FileMetadata } from "../file.js";
import { UUID } from "../../types/index.js";

export function fileMock(opts?: Partial<FileMetadata>): FileMetadata {
    return {
            id: faker.string.uuid() as UUID,
            name: faker.commerce.productName(),
            type: "image/png",
            referenceId: faker.string.uuid() as UUID,
            size: faker.number.int({min:50, max: 500}),
            url: faker.image.url(),
            createdAt: new Date(),
            ...opts,
        }
}