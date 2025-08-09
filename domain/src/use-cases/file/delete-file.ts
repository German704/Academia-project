import { NotFoundError } from "../../errors/errors.js";
import { FileMetadataService } from "../../services/index.js";

export interface deleteFilePayload {
  id: string;
}

export interface deleteFileDependencies {
  fileMetadataService: FileMetadataService;
}

export async function deleteFile(
  { fileMetadataService }: deleteFileDependencies,
  { id }: deleteFilePayload
): Promise<{ message: string}> {
  const file = await fileMetadataService.findById(id);

  if (!file) {
    throw new NotFoundError({ file: "File not found" });
  }

  await fileMetadataService.delete(id)

  return { message: `File with id ${id} was removed successfully`}
}