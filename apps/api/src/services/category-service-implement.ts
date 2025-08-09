import { Repository } from "typeorm";
import { Category, CategoryService, NotFoundError, UUID } from "app-domain";
import { CategoryEntity } from "../entities/category.js";

export class CategoryServiceImplement implements CategoryService {
  constructor(private CategoryRepository: Repository<CategoryEntity>) {}

  async findById(id: string): Promise<Category | null> {
    const category = await this.CategoryRepository.findOneBy({
      id: id as UUID,
    });
    return category;
  }
  async findByName(name: string): Promise<Category | null> {
    const category = await this.CategoryRepository.findOneBy({
      name: name,
    });
    return category;
  }

  async getAll(): Promise<Category[]> {
    const categories = await this.CategoryRepository.find();
    return categories;
  }
  async save(
    category: Omit<Category, "createdAt" | "updatedAt">
  ): Promise<Category> {
    const newCategory = await this.CategoryRepository.save({
      ...category,
    });
    return newCategory;
  }

  async update(category: Category): Promise<Category> {
    const existingCategory = await this.CategoryRepository.findOneBy({
      id: category.id,
    });
    if (!existingCategory) {
      throw new NotFoundError({ product: "Category not found" });
    }

    this.CategoryRepository.merge(existingCategory, category);

    const updatedCategory = await this.CategoryRepository.save(
      existingCategory
    );
    return updatedCategory;
  }

  async delete(id: string): Promise<void> {
    const result = await this.CategoryRepository.delete({ id: id as UUID });
    if (result.affected === 0) {
        throw new NotFoundError({ product: "Category not found" });
    }
  }
}
