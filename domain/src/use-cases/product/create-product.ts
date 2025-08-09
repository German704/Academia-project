import { Product } from "../../entities/index.js";
import { InvalidDataError, NotFoundError } from "../../errors/errors.js";
import { CategoryService } from "../../services/category-service.js";
import { ProductService } from "../../services/product-service.js";

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
}

export interface CreateProductDependencies {
  productService: ProductService; 
  categoryService: CategoryService;
}

export async function createProduct(
  { productService, categoryService }: CreateProductDependencies,
  { name, description, price, stock, categoryId }: CreateProductPayload
): Promise<Product> {
  if (!name || name.trim().length < 3) {
    throw new InvalidDataError({ name: "The name must be at least 3 characters long" });
  }

  if (price <= 0) {
    throw new InvalidDataError({ price: "Price must be greater than zero" });
  }
  
  if (stock < 0) {
    throw new InvalidDataError({ stock: "The stock cannot be negative" });
  }

  const categoryExists = await categoryService.findById(categoryId);
  if (!categoryExists) {
    throw new NotFoundError({ category: "The specified category does not exist" });
  }

  const newProduct = await productService.save({
    name,
    description,
    price,
    stock,
    category: categoryExists.name,
  });

  return newProduct;
}