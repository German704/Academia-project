import { UserRole } from "../types/index.js";
import { UUID } from "../types/types.js";

export interface User {
  id: UUID;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};
