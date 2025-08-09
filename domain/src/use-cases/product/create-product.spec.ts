import { beforeEach, describe, expect, test, vi } from "vitest";
import { InvalidDataError, NotFoundError } from "../../errors/errors";
import {
  categoryServiceMock,
  MockedCategoryService,
  MockedProductService,
  productServiceMock,
} from "../../services/mocks";
import {
  createProduct,
  CreateProductPayload,
  CreateProductDependencies,
} from "../product/create-product";
import { CryptoService } from "../../services";
import { categoryMock, } from "../../entities";
import { UUID } from "crypto";

describe("createProduct use case", () => {
  let mockProductService: MockedProductService;

  let mockCategoryService: MockedCategoryService;

  let dependencies: CreateProductDependencies;

  const productPayload: CreateProductPayload = {
    name: "Laptop",
    description: "A powerful laptop for work and gaming",
    price: 1500,
    stock: 50,
    categoryId: "tech-category-uuid",
  };

  const categoryData = categoryMock({ id: "tech-category-uuid" as UUID, name: "Electronics" });

  beforeEach(() => {
    mockProductService = productServiceMock();

    mockCategoryService = categoryServiceMock([categoryData]);

    dependencies = {
      productService: mockProductService,
      categoryService: mockCategoryService,
    };
  });

  test("should throw InvalidDataError if product name is invalid", async () => {
    const invalidPayload = { ...productPayload, name: "ab" };

    await expect(createProduct(dependencies, invalidPayload)).rejects.toThrow(
      InvalidDataError
    );
    await expect(
      createProduct(dependencies, invalidPayload)
    ).rejects.toHaveProperty(
      "context.name",
      "The name must be at least 3 characters long"
    );
  });

  test("should throw InvalidDataError if product price is not valid", async () => {
    const invalidPayload = { ...productPayload, price: 0 };

    await expect(createProduct(dependencies, invalidPayload)).rejects.toThrow(
      InvalidDataError
    );
    await expect(
      createProduct(dependencies, invalidPayload)
    ).rejects.toHaveProperty(
      "context.price",
      "Price must be greater than zero"
    );
  });

  test("should throw InvalidDataError if product stock is negative", async () => {
    const invalidPayload = { ...productPayload, stock: -1 };

    await expect(createProduct(dependencies, invalidPayload)).rejects.toThrow(
      InvalidDataError
    );
    await expect(
      createProduct(dependencies, invalidPayload)
    ).rejects.toHaveProperty("context.stock", "The stock cannot be negative");
  });

  test("should throw NotFoundError if category does not exist", async () => {
    const invalidPayload = {
      ...productPayload,
      categoryId: "non-existent-uuid",
    };
    const result = createProduct(dependencies, invalidPayload)

    await expect(result).rejects.toThrow(
      NotFoundError
    );
    await expect(
      result
    ).rejects.toHaveProperty(
      "context.category",
      "The specified category does not exist"
    );
  });

  test("should successfully create a new product and return it", async () => {
    const result = await createProduct(dependencies, productPayload);

    expect(result.name).toEqual(productPayload.name);
    expect(result.description).toEqual(productPayload.description);
    expect(result.price).toEqual(productPayload.price);
    expect(result.stock).toEqual(productPayload.stock);
    expect(result.category).toEqual(categoryData.name);
  });
});
