import { beforeEach, describe, expect, test } from "vitest";
import {
  fileMetadataServiceMock,
  MockedFileMetadataService,
} from "../../services/mocks";
import {
  deleteFile,
  deleteFileDependencies,
  deleteFilePayload,
} from "../file/delete-file";
import { fileMock } from "../../entities";
import { UUID } from "../../types/index";
import { NotFoundError } from "../../errors/errors";

describe("deleteFile use case", () => {
  let fileMetadataService: MockedFileMetadataService;
  let dependencies: deleteFileDependencies;

  const deleteFilePayload: deleteFilePayload = {
    id: "file-to-remove",
  };

  const fileToRemove = fileMock({
    id: "file-to-remove" as UUID,
    referenceId: "product-with-file" as UUID,
  });
  const productFiles = [
    fileMock({ referenceId: "product-with-file" as UUID }),
    fileMock({ referenceId: "product-with-file" as UUID }),
    fileMock({ referenceId: "other-with-file" as UUID }),
  ];

  beforeEach(() => {
    fileMetadataService = fileMetadataServiceMock([
      ...productFiles,
      fileToRemove,
    ]);

    dependencies = {
      fileMetadataService: fileMetadataService,
    };
  });

  test("should throw NotFoundError when a product with the given id does not exist", async () => {
    const result = deleteFile(dependencies, { id: "invalid" });

    await expect(result).rejects.toThrow(NotFoundError);
    await expect(result).rejects.toHaveProperty(
      "context.file",
      "File not found"
    );
  });

  test("should return product detail with corresponding images", async () => {
    const result = await deleteFile(dependencies, deleteFilePayload);

    expect(result).toEqual({
      message: `File with id ${deleteFilePayload.id} was removed successfully`,
    });
    expect(fileMetadataService.files).toHaveLength(3);
    expect(fileMetadataService.files).toEqual(productFiles);
  });
});
