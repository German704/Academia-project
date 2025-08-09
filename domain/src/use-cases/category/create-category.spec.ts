import { beforeEach, describe, expect, test } from "vitest";
import { InvalidDataError } from "../../errors/errors";
import {
    categoryServiceMock,
  MockedCategoryService,
} from "../../services/mocks";
import {createCategory, CreateCategoryDependencies, CreateCategoryPayload} from "./create-category"
import { categoryMock, } from "../../entities";
import { UUID } from "crypto";

describe("createCategory use case", () => {

  let mockCategoryService: MockedCategoryService;

  let dependencies: CreateCategoryDependencies;

  const categoryPayload: CreateCategoryPayload = {
    name: "Pets",
  };

  const categoryData = categoryMock({ id: "tech-category-uuid" as UUID, name: "Electronics" });

  beforeEach(() => {
    mockCategoryService = categoryServiceMock([categoryData]);

    dependencies = {
      categoryService: mockCategoryService,
    };
  });

  test("should throw InvalidDataError if category name is invalid", async () => {
    const invalidPayload = { name: "" };

    await expect(createCategory(dependencies, invalidPayload)).rejects.toThrow(
      InvalidDataError
    );
    await expect(
      createCategory(dependencies, invalidPayload)
    ).rejects.toHaveProperty(
      "context.name",
      "The name must be at least 3 characters long"
    );
  });
  test("should throw InvalidDataError if category name already exist", async () => {
    const invalidPayload = { name: "electronics" };

    await expect(createCategory(dependencies, invalidPayload)).rejects.toThrow(
      InvalidDataError
    );
    await expect(
      createCategory(dependencies, invalidPayload)
    ).rejects.toHaveProperty(
      "context.name",
      "The Category name already exist"
    );
  });

  test("should successfully create a new category and return it", async () => {
    const result = await createCategory(dependencies, categoryPayload);

    expect(result.name).toEqual(categoryPayload.name);
    expect(mockCategoryService.categories).toHaveLength(2);
    expect(result.id).toEqual(mockCategoryService.categories[1].id);
  });
});
