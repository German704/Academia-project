import { NotFoundError } from "../../errors/errors.js";
import { ProductService } from "../../services/product-service.js";
import { ProductViewModel } from "../../types/index.js";

export interface getProductDetailPayload {
  id: string;
}

export interface GetProductDetailDependencies {
  productService: ProductService;
}

export async function getProductDetail(
  { productService }: GetProductDetailDependencies,
  { id }: getProductDetailPayload
): Promise<ProductViewModel> {
  const product = await productService.findByIdWithImage(id);

  if (!product) {
    throw new NotFoundError({ product: "Product not found" });
  }

  return product;
}