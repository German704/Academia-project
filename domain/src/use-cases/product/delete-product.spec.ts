import { beforeEach, describe, expect, test } from "vitest";
import {
    fileMetadataServiceMock,
    MockedFileMetadataService,
  MockedProductService,
  productServiceMock,
} from "../../services/mocks";
import { deleteProduct, DeleteProductDependencies, DeleteProductPayload } from "../product/delete-product";
import { fileMock, productMock } from "../../entities";
import { UUID } from "../../types";
import { NotFoundError } from "../../errors/errors";

describe("deleteProduct use case", () => {
  let mockProductService: MockedProductService;
  let fileMetadataService: MockedFileMetadataService;
  let dependencies: DeleteProductDependencies;

  const productPayload: DeleteProductPayload = {
      id: "product-with-file",
    };

  const products = [
    productMock({ id: "product-with-file" as UUID }),
    productMock(),
    productMock({ id: "other-with-file" as UUID }),
    productMock(),
  ];
  const productFiles = [
    fileMock({ referenceId: "product-with-file" as UUID }),
    fileMock({ referenceId: "product-with-file" as UUID }),
    fileMock({ referenceId: "product-with-file" as UUID }),
    fileMock({ referenceId: "other-with-file" as UUID }),
  ];

  beforeEach(() => {
    mockProductService = productServiceMock(products, productFiles);
    fileMetadataService = fileMetadataServiceMock(productFiles);

    dependencies = {
      productService: mockProductService,
      fileMetadataService: fileMetadataService,
    };
  });

  test("should throw NotFoundError when a product with the given id does not exist", async () => {
    const result = deleteProduct(dependencies, {id: "invalid"});
    
        await expect(result).rejects.toThrow(
          NotFoundError
        );
        await expect(
          result
        ).rejects.toHaveProperty(
          "context.product",
          "Product not found"
        );
  });
 
  test("should return product detail with corresponding images", async () => {
    const result = await deleteProduct(dependencies, productPayload);
    
    expect(result).toEqual({ message: `Product with id ${productPayload.id} was removed successfully`})
    expect(fileMetadataService.files).toHaveLength(1);
    expect(fileMetadataService.files[0].referenceId).toBe("other-with-file");
  });
});
