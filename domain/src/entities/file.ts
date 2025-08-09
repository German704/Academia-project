import { UUID } from "../types/types.js";

export interface FileMetadata {
  id: UUID;
  name: string;
  url: string;
  size: number;
  type: string;
  referenceId: UUID;
  createdAt: Date;
}
