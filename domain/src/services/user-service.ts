import { User } from "../entities/index.js";
import { RegisterPayload, UserViewModel } from "../types/index.js";

export interface UserService {
    save(user: RegisterPayload): Promise<UserViewModel>;
    update(user: User): Promise<UserViewModel>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    getAll(): Promise<UserViewModel[]>;
}