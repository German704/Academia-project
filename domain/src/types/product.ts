import { Product, FileMetadata } from "../entities/index.js";

export type ProductViewModel = Omit<Product, "createdAt" | "updatedAt" | "categoryId"> & {
    images: FileMetadata[];
}