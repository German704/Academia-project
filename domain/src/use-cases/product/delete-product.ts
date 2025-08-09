import { NotFoundError } from "../../errors/errors.js";
import { FileMetadataService } from "../../services/index.js";
import { ProductService } from "../../services/product-service.js";

export interface DeleteProductPayload {
  id: string;
}

export interface DeleteProductDependencies {
  productService: ProductService;
  fileMetadataService: FileMetadataService;
}

export async function deleteProduct(
  { productService, fileMetadataService }: DeleteProductDependencies,
  { id }: DeleteProductPayload
): Promise<{ message: string}> {
  const product = await productService.findById(id);

  if (!product) {
    throw new NotFoundError({ product: "Product not found" });
  }

  await fileMetadataService.deleteByProductId(id)

  await productService.delete(id)

  return { message: `Product with id ${id} was removed successfully`}
}