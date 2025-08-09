import { User } from "../../entities/index.js";
import { UserRole } from "../../types/index.js";
import { UserService } from "../user-service.js";

export interface MockedUserService extends UserService {
    users: User[];
}

export function usersServiceMock(users: User[] = []): MockedUserService {
    return {
        users: [...users],

        async save(user) {
            const newUser: User = {
                ...user,
                id: crypto.randomUUID(),
                role: UserRole.CLIENT,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            this.users.push(newUser)
            return {
                id: newUser.id,
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email,
                role: newUser.role,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
            }
        },
        async update(user: User) {
            const updateUser: User = {
                ...user,
                updatedAt: new Date(),
            }
            const index = this.users.findIndex(user => user.id == user.id)
            this.users.splice(index, 1, updateUser)

            return {
                id: updateUser.id,
                name: updateUser.name,
                surname: updateUser.surname,
                email: updateUser.email,
                role: updateUser.role,
                createdAt: updateUser.createdAt,
                updatedAt: updateUser.updatedAt,
            }
        },
        async findById(id: string) {
            const user = this.users.find((user) => user.id === id);
            return user || null;
        },
        async findByEmail(email: string) {
            const user = this.users.find((user) => user.email === email);
            return user || null;
        },
        async getAll() {
            return this.users.map( ({id, name, surname, email, role, createdAt, updatedAt}) => ({
                id,
                name,
                surname,
                email,
                role,
                createdAt,
                updatedAt
            }))
        },
    }
}