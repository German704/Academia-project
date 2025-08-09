import { describe, test, expect, beforeEach } from 'vitest';
import { FileData } from '../../types';
import { MockedFileMetadataService, MockedProductService, productServiceMock, fileMetadataServiceMock } from '../../services/mocks';
import { Product } from '../../entities';
import { UUID } from 'crypto';
import { UploadFileDependencies, UploadFilePayload, uploadFile } from './upload-files';
import { InvalidDataError, NotFoundError } from '../../errors/errors';

const mockProduct: Product = {
  id: "uuid-producto-1" as UUID,
  name: "Mock Product",
  description: "A description",
  price: 100,
  stock: 10,
  category: "category",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockMulterFile = (size: number, mimetype: string): FileData => ({
  originalname: 'test-image.png',
  mimetype: mimetype,
  size: size,
  buffer: Buffer.from('some fake data'),
});

describe("uploadFile", () => {
  let productService: MockedProductService;
  let fileService: MockedFileMetadataService;
  let dependencies: UploadFileDependencies;

  beforeEach(() => {
    productService = productServiceMock([mockProduct]);
    fileService = fileMetadataServiceMock([]);
    dependencies = {
      productService,
      fileService,
    };
  });

  test("Should upload file and return file metadata", async () => {
    const payload: UploadFilePayload = {
      file: mockMulterFile(1000, 'image/png'),
      productId: mockProduct.id,
    };

    const result = await uploadFile(dependencies, payload);

    expect(result).toEqual(expect.any(Object));
    expect(result.id).toEqual(expect.any(String));
    expect(result.name).toEqual(payload.file.originalname);
    expect(result.productId).toEqual(payload.productId);

    expect(fileService.files).toHaveLength(1);
    expect(fileService.files[0].referenceId).toBe(mockProduct.id);
  });

  test("Should throw InvalidDataError if no file is provided", async () => {
    const payload = {
      productId: mockProduct.id,
    } 
    const result = uploadFile(dependencies, payload as any)

    await expect(result).rejects.toThrow(InvalidDataError);
    await expect(result).rejects.toHaveProperty("context.file", "File is required");
  });

  test("Should throw InvalidDataError if file type is not allowed", async () => {
    const payload: UploadFilePayload = {
      file: mockMulterFile(1000, 'application/pdf'), 
      productId: mockProduct.id,
    };

    await expect(uploadFile(dependencies, payload)).rejects.toThrow(InvalidDataError);
    await expect(uploadFile(dependencies, payload)).rejects.toHaveProperty("context.file", "Only JPG or PNG files are allowed");
  });

  test("Should throw InvalidDataError if file size exceeds the limit", async () => {
    const payload: UploadFilePayload = {
      file: mockMulterFile(6 * 1024 * 1024, 'image/jpeg'), // 6 MB > 5 MB
      productId: mockProduct.id,
    };

    await expect(uploadFile(dependencies, payload)).rejects.toThrow(InvalidDataError);
    await expect(uploadFile(dependencies, payload)).rejects.toHaveProperty("context.file", "The file size cannot exceed 5 MB");
  });

  test("Should throw NotFoundError if product does not exist", async () => {
    const payload: UploadFilePayload = {
      file: mockMulterFile(1000, 'image/png'),
      productId: "non-existent-product-id",
    };

    await expect(uploadFile(dependencies, payload)).rejects.toThrow(NotFoundError);
    await expect(uploadFile(dependencies, payload)).rejects.toHaveProperty("context.product", "Product not found");
  });
});