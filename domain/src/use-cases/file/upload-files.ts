import { InvalidDataError, NotFoundError } from "../../errors/errors.js";
import { FileMetadataService } from "../../services/index.js";
import { ProductService } from "../../services/product-service.js";
import { FileData } from "../../types/index.js";

export interface UploadFilePayload {
  file: FileData;
  productId: string;
}

export interface UploadFileDependencies {
  fileService: FileMetadataService; 
  productService: ProductService;
}

export interface UploadFileResponseModel {
  id: string; 
  name: string;
  url: string;
  size: number;
  type: string;
  productId: string;
  createdAt: Date;
}

export async function uploadFile(
  { fileService, productService }: UploadFileDependencies,
  { file, productId }: UploadFilePayload
): Promise<UploadFileResponseModel> {

  if (!file) {
    throw new InvalidDataError({ file: "File is required" });
  }

  if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') 
    throw new InvalidDataError({ file: "Only JPG or PNG files are allowed" });
  
  if (file.size > 5 * 1024 * 1024)  // 5 MB
    throw new InvalidDataError({ file: "The file size cannot exceed 5 MB" });
  

  const productExists = await productService.findById(productId);
  if (!productExists) 
    throw new NotFoundError({ product: "Product not found" });
  

  const newFile = await fileService.uploadAndSave({
    fileData: file,
    referenceId: productId,
  });

  return {
    id: newFile.id,
    name: newFile.name,
    url: newFile.url,
    size: newFile.size,
    type: newFile.type,
    productId: newFile.referenceId,
    createdAt: newFile.createdAt,
  };
}