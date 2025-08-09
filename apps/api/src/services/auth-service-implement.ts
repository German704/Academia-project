import { AuthService, JwtToken, UserRole, UUID } from "app-domain";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants.js";
import { UserServiceImplement } from "./user-service-implement.js";

export class AuthServiceImplement implements AuthService {
  constructor(private userService?: UserServiceImplement) {}

  async generateToken(userId: UUID): Promise<string> {
      return jwt.sign(
            {
                sub: userId,
            },
            JWT_SECRET,
            {
                expiresIn: "24h",
            },
        );
  }
  async comparePassword(password: string, hash: string): Promise<boolean> {
      return await compare(password, hash);
  }
  async hashPassword(password: string): Promise<string> {
      return await hash(password, 12);
  }
  async verifyToken(token: string): Promise<JwtToken | null> {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return (decoded as JwtToken);
    } catch (error) {
        return null;
    }
}

async isAdmin(userId: string): Promise<boolean> {
    const user = await this.userService?.findById(userId);
    if(user)
    return user.role === UserRole.ADMIN;

    return false
  }
}