import { ProductService } from "../../services/product-service.js";
import { ProductViewModel } from "../../types/index.js";


export interface GetProductsDependencies {
  productService: ProductService;
}

export async function getProducts(
  { productService }: GetProductsDependencies,
): Promise<ProductViewModel[]> {
  const products = await productService.getAll();
  return products;
}