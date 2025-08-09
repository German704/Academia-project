import { AuthService } from "../auth-service.js";

export function authServiceMock(): AuthService {
    return {
        async generateToken(userId: string) {
            return "JWT" + JSON.stringify(userId);
        },
        async verifyToken(token: string) {
            return JSON.parse(token.slice(3));
        },
        async hashPassword(password: string) {
            return "#hash#" + password;
        },
        async comparePassword(password: string, hash: string) {
            const compare = await this.hashPassword(password);
            return hash == compare;
        },
    }
}