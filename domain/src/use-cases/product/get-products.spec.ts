import { beforeEach, describe, expect, test } from "vitest";
import {
  MockedProductService,
  productServiceMock,
} from "../../services/mocks";
import { getProducts, GetProductsDependencies } from "../product/get-products";
import { fileMock, productMock } from "../../entities";
import { UUID } from "../../types";

describe("getProducts use case", () => {
  let mockProductService: MockedProductService;
  let dependencies: GetProductsDependencies;

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

  test("should return an empty array if there are no products", async () => {
    const result = await getProducts({
      productService: productServiceMock([], []),
    });

    expect(result).toEqual([]);
  });
 
  test("should return all products with their corresponding images", async () => {
    const result = await getProducts(dependencies);
    
    expect(result).toHaveLength(4);
    
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "product-with-file",
          name: expect.any(String),
          images: expect.arrayContaining([
            expect.objectContaining({
              referenceId: "product-with-file",
              name: expect.any(String),
            }),
          ]),
        }),
        expect.objectContaining({
          id: products[1].id,
          name: expect.any(String),
          images: [],
        }),
        expect.objectContaining({
          id: "other-with-file",
          name: expect.any(String),
          images: expect.arrayContaining([
            expect.objectContaining({
              referenceId: "other-with-file",
              name: expect.any(String),
            }),
          ]),
        }),
        expect.objectContaining({
          id: products[3].id,
          name: expect.any(String),
          images: [],
        }),
      ])
    );
  });
});
