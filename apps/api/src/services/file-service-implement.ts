import { Repository } from "typeorm";
import { FileMetadataService, FileMetadata, UUID, NotFoundError, FileData } from "app-domain";
import { FileEntity } from "../entities/file.js";
import { promises as fs } from 'fs';
import path from 'path';

const UPLOAD_DIRECTORY = path.join(process.cwd(), 'public', 'uploads');

export class FileServiceImplement implements FileMetadataService {
  constructor(private fileRepository: Repository<FileEntity>) {
    fs.mkdir(UPLOAD_DIRECTORY, { recursive: true }).catch(console.error);
  }

  async uploadAndSave(data: { fileData: FileData; referenceId: string }): Promise<FileMetadata> {
    const fileData = data.fileData;
    const referenceId = data.referenceId as UUID;

    const uniqueFilename = `${crypto.randomUUID()}${path.extname(fileData.originalname)}`;
    const filePath = path.join(UPLOAD_DIRECTORY, uniqueFilename);
    const fileUrl = `/uploads/${uniqueFilename}`;

    await fs.writeFile(filePath, fileData.buffer);

    const newFile = this.fileRepository.create({
      name: fileData.originalname,
      url: fileUrl,
      size: fileData.size,
      type: fileData.mimetype,
      referenceId: referenceId,
    });

    return this.fileRepository.save(newFile);
  }

  async findById(id: string): Promise<FileMetadata | null> {
    const file = await this.fileRepository.findOneBy({ id: id as UUID });
    return file;
  }

  async findByProductId(productId: string): Promise<FileMetadata[]> {
    const files = await this.fileRepository.findBy({ referenceId: productId as UUID });
    return files;
  }

  async delete(id: string): Promise<void> {
    const file = await this.fileRepository.findOneBy({ id: id as UUID });
    if (!file) {
      throw new NotFoundError({ file: "File not found" });
    }

    const filePath = path.join(process.cwd(), 'public', file.url);
    try {
      await fs.unlink(filePath);
    } catch (err: any) {
      if (err.code !== 'ENOENT') {
        console.error(`Error deleting file from disk: ${err}`);
      }
    }

    await this.fileRepository.delete({ id: file.id });
  }
  async deleteByProductId(id: string): Promise<void> {
    const files = await this.findByProductId(id);
    if (files.length === 0) {
      return;
    }

    for (const file of files) {
      const filePath = path.join(process.cwd(), 'public', file.url);
      try {
        await fs.unlink(filePath);
      } catch (err: any) {
        if (err.code !== 'ENOENT') {
          console.error(`Error deleting file from disk: ${err}`);
        }
      }
    }

    await this.fileRepository.delete({ referenceId: id as UUID });
  }
}