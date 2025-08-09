import { Product } from "../entities/index.js";
import { ProductViewModel } from "../types/index.js";


export interface ProductService {
    save(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product>;
    update(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findByIdWithImage(id: string): Promise<ProductViewModel | null>;
    getAll(): Promise<ProductViewModel[]>;
    delete(id: string): Promise<void>;
}