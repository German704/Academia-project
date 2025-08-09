import {
  RegisterPayload,
  User,
  UserRole,
  UserService,
  UserViewModel,
  UUID,
} from "app-domain";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.js";
import { NotFoundError } from "app-domain";

export class UserServiceImplement implements UserService {
  constructor(private userRepository: Repository<UserEntity>) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: id as UUID });
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email: email });
    return user;
  }
  async getAll(): Promise<UserViewModel[]> {
    const users = await this.userRepository.find();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
    }));
  }
  async save(user: RegisterPayload): Promise<UserViewModel> {
    const newUser = await this.userRepository.save({
      ...user,
      role: UserRole.CLIENT,
    });
    return {
      id: newUser.id,
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      role: newUser.role,
    };
  }
  async update(user: User): Promise<UserViewModel> {
    const existingUser = await this.userRepository.findOneBy({ id: user.id });
    if (!existingUser) {
        throw new NotFoundError({user: "User not found"});
    }
    
    this.userRepository.merge(existingUser, user);
    
    const updatedUser = await this.userRepository.save(existingUser);
    
    return {
        id: updatedUser.id,
        name: updatedUser.name,
        surname: updatedUser.surname,
        email: updatedUser.email,
        role: updatedUser.role
    };
}
}
