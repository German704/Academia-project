import { UUID } from "../types/index.js";

export interface JwtToken {
    sub: string;
}
export interface AuthService {
    generateToken(userId: UUID): Promise<string>;
    verifyToken(token: string): Promise<JwtToken | null>;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}
