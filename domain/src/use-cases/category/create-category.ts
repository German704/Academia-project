import { Category } from "../../entities/product.js";
import { InvalidDataError } from "../../errors/errors.js";
import { CategoryService } from "../../services/category-service.js";

export interface CreateCategoryPayload {
  name: string;
}

export interface CreateCategoryDependencies {
  categoryService: CategoryService;
}

export async function createCategory(
  { categoryService }: CreateCategoryDependencies,
  { name }: CreateCategoryPayload
): Promise<Category> {
  if (!name || name.trim().length < 3) {
    throw new InvalidDataError({ name: "The name must be at least 3 characters long" });
  }

  const existingCategory = await categoryService.findByName(name)
  if (existingCategory) {
    throw new InvalidDataError({ name: "The Category name already exist" });
  }

  const newCategory = await categoryService.save({
    name,
  });

  return newCategory;
}