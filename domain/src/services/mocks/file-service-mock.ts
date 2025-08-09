import { UUID } from "crypto";
import { FileMetadata } from "../../entities/index.js"; // Asumiendo que tu entidad está en este path
import { FileMetadataService } from "../file-service.js";

export interface MockedFileMetadataService extends FileMetadataService {
  files: FileMetadata[];
}

export function fileMetadataServiceMock(files: FileMetadata[] = []): MockedFileMetadataService {
  return {
    files: [...files],

    async uploadAndSave(data) {
      const newFile: FileMetadata = {
        id: crypto.randomUUID(),
        name: data.fileData.originalname,
        url: `http://mock-url.com/${data.fileData.originalname}`,
        size: data.fileData.size,
        type: data.fileData.mimetype,
        referenceId: data.referenceId as UUID,
        createdAt: new Date(),
      };
      this.files.push(newFile);
      return newFile;
    },

    async findByProductId(productId: string) {
      return this.files.filter((file) => file.referenceId === productId);
    },

    async findById(id: string) {
      return this.files.find((file) => file.id === id) || null;
    },

    async delete(id: string) {
      const fileIndex = this.files.findIndex(file => file.id === id);
      if (fileIndex !== -1) {
        this.files.splice(fileIndex, 1);
      }
    },
    async deleteByProductId(id: string) {
      this.files = this.files.filter(item => item.referenceId !== id)
    },
  };
}