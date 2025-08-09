import { Category } from "../entities/index.js";

export interface CategoryService {
    save(category: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category>;
    update(category: Category): Promise<Category>;
    findById(id: string): Promise<Category | null>;
    findByName(name: string): Promise<Category | null>;
    getAll(): Promise<Category[]>;
    delete(id: string): Promise<void>;
}