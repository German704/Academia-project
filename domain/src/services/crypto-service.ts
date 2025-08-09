import { UUID } from "../types/index.js";

export interface CryptoService {
    generateUUID(): UUID;
    generateToken(): Promise<string>;
}
