import { User } from "../entities/index.js";
import { UUID } from "./types.js";

export const UserRole = {
    ADMIN: "ADMIN",
    CLIENT: "CLIENT",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole] & string;

export type RegisterPayload = Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt'> & {
  password: string;
}

export type UserUpdatePayload = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>> & {
  id: UUID;
}

export type UserViewModel = Omit<User, 'password' | 'createdAt' | 'updatedAt'>