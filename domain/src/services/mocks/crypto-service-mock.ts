import { UUID } from "../../types/types.js";
import { CryptoService } from "../crypto-service.js";


export function cryptoServiceMock(): CryptoService {
    return {
        generateUUID(): UUID {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                function (c) {
                    const r = (Math.random() * 16) | 0,
                        v = c === "x" ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                },
            ) as UUID;
        },
        async generateToken(): Promise<string> {
            const char =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let token = "";

            for (let i = 0; i < 10; i++) {
                const rIndex = Math.floor(Math.random() * char.length);
                const randomChar = char[rIndex];
                token += randomChar;
            }

            return token;
        },
    };
}
