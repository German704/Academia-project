import { User } from "app-domain";

declare global {
  namespace Express {
    export interface Request {
      user?: Partial<User>;
    }
  }
}
