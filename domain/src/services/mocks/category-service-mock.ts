import { Category } from "../../entities/index.js";
import { CategoryService } from "../category-service.js";


export interface MockedCategoryService extends CategoryService {
    categories: Category[];
}

export function categoryServiceMock(categories: Category[] = []): MockedCategoryService {
    return {
        categories: [...categories],

        async save(category) {
            const newCategory: Category = {
                ...category,
                id: crypto.randomUUID(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            this.categories.push(newCategory)
            return newCategory
        },
        async update(category: Category) {
            const updateCategory: Category = {
                ...category,
                updatedAt: new Date(),
            }
            const index = this.categories.findIndex(item => item.id == category.id)
            this.categories.splice(index, 1, updateCategory)

            return updateCategory
        },
        async findById(id: string) {
            const category = this.categories.find((category) => category.id === id);
            return category || null;
        },
        async findByName(name: string) {
            const category = this.categories.find((category) => category.name.toLowerCase() === name.toLowerCase());
            return category || null;
        },
        async getAll() {
            return this.categories
        },

        async delete(id) {
           this.categories = this.categories.filter(category => category.id !== id)
        },
    }
}