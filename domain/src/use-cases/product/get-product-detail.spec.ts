import { beforeEach, describe, expect, test } from "vitest";
import {
  MockedProductService,
  productServiceMock,
} from "../../services/mocks";
import { getProductDetail, GetProductDetailDependencies, getProductDetailPayload } from "../product/get-product-detail";
import { fileMock, productMock } from "../../entities";
import { UUID } from "../../types";
import { NotFoundError } from "../../errors/errors";

describe("getProductDetail use case", () => {
  let mockProductService: MockedProductService;
  let dependencies: GetProductDetailDependencies;

  const productPayload: getProductDetailPayload = {
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

    dependencies = {
      productService: mockProductService,
    };
  });

  test("should throw NotFoundError when a product with the given id does not exist", async () => {
    const result = getProductDetail(dependencies, {id: "invalid"});
    
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
    const result = await getProductDetail(dependencies, productPayload);
    
    expect(result).toEqual(expect.objectContaining({
          id: "product-with-file",
          name: expect.any(String),
          images: expect.arrayContaining([
            expect.objectContaining({
              referenceId: "product-with-file",
              name: expect.any(String),
            }),
          ]),
        }),)
  });
});
