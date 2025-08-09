import { FileMetadata } from "../entities/index.js";
import { FileData } from "../types/index.js";

export interface FileMetadataService {
  uploadAndSave(data: {
    fileData: FileData;
    referenceId: string;
  }): Promise<FileMetadata>;

  findByProductId(productId: string): Promise<FileMetadata[]>;
  findById(id: string): Promise<FileMetadata | null>;
  delete(id: string): Promise<void>;
  deleteByProductId(id: string): Promise<void>;
}
