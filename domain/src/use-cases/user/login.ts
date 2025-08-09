import {
  InvalidCredentialsError,
  InvalidDataError,
} from "../../errors/errors.js";
import { AuthService, UserService } from "../../services/index.js";
import { UserViewModel } from "../../types/index.js";
import { isValidEmail} from "../../utils/validator.js";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginDependencies {
  userService: UserService;
  authService: AuthService;
}

export interface LoginResponseModel {
    token: string,
    user: Omit<UserViewModel, "createdAt" | "updatedAt">
  }

export async function login(
  { userService, authService }: LoginDependencies,
  { email, password }: LoginPayload
): Promise<LoginResponseModel> {
  if (!email || !isValidEmail(email))
    throw new InvalidDataError({ email: "Invalid Email" });

  const normalizeEmail = email.toLowerCase();

  const user = await userService.findByEmail(normalizeEmail);
  if (!user || !(await authService.comparePassword(password, user.password))) {
    throw new InvalidCredentialsError({ message: "Invalid credentials" });
  }

  const token = await authService.generateToken(user.id);
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role
    }
  };
}
