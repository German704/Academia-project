import { Product } from "../../entities/index.js";
import { InvalidDataError, NotFoundError } from "../../errors/errors.js";
import { CategoryService } from "../../services/category-service.js";
import { ProductService } from "../../services/product-service.js";

export interface UpdateProductPayload {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
}

export interface UpdateProductDependencies {
  productService: ProductService;
  categoryService: CategoryService;
}

export async function updateProduct(
  { productService, categoryService }: UpdateProductDependencies,
  { id, name, description, price, stock, categoryId }: UpdateProductPayload
): Promise<Product> {
  const productToEdit = await productService.findById(id);

  const validationErrors: Record<string, string> = {};
  if (!productToEdit)
    throw new NotFoundError({
      product: "Product not found",
    });

  if (name && name.trim().length < 3)
    validationErrors.name = "The name must be at least 3 characters long";

  if ((!price && price === 0) && price <= 0)
    validationErrors.price = "Price must be greater than zero";

  if (stock && stock < 0)
    validationErrors.stock = "The stock cannot be negative";

  if (Object.keys(validationErrors).length > 0)
    throw new InvalidDataError(validationErrors);

  let newCategory: string | undefined;

  if (categoryId) {
    newCategory = (await categoryService.findById(categoryId))?.name;
    if (!newCategory)
      throw new NotFoundError({
        category: "The specified category does not exist",
      });
  }

  const updatedProductData = {
    ...productToEdit,
    name: name ?? productToEdit.name,
    description: description ?? productToEdit.description,
    price: price ?? productToEdit.price,
    stock: stock ?? productToEdit.stock,
    category: newCategory ?? productToEdit.category,
  };

  const productUpdated = await productService.update(updatedProductData);

  return productUpdated;
}
