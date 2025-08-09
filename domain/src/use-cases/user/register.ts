import { InvalidDataError, UserAlreadyExistError } from "../../errors/errors.js";
import { AuthService, UserService } from "../../services/index.js";
import { RegisterPayload, UserViewModel } from "../../types/index.js";
import { isValidEmail, isValidPassword } from "../../utils/validator.js";
  
export interface RegisterDependencies {
  userService: UserService;
  authService: AuthService;
}

export interface RegisterResponseModel { user: UserViewModel, token: string }

export async function register(
  { userService, authService }: RegisterDependencies,
  payload: RegisterPayload
): Promise<RegisterResponseModel> {
  const { name, surname, email, password } = payload;
  const validationErrors: Record<string, string> = {};

  if (!name || name.trim() === "") {
    validationErrors.name = "The name is required";
  }
  if (!surname || surname.trim() === "") {
    validationErrors.surname = "The surname is required";
  }
  if (!email || !isValidEmail(email)) {
    validationErrors.email = "Invalid Email";
  }
  if (!password || !isValidPassword(password)) {
    validationErrors.password = "Invalid Password";
  }
  
  if (Object.keys(validationErrors).length > 0) {
    throw new InvalidDataError(validationErrors);
  }

  const normalizedEmail = email.toLowerCase();

  const existUser = await userService.findByEmail(normalizedEmail);
  if (existUser) {
    throw new UserAlreadyExistError();
  }

  const hashPassword = await authService.hashPassword(password)
  console.log(hashPassword);
  
  const registeredUser = await userService.save({
    ...payload,
    email: normalizedEmail,
    password: hashPassword
  })

  const token = await authService.generateToken(registeredUser.id);

  return { user: registeredUser, token: token };
}
