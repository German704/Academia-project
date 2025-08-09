import { describe, beforeEach, test, expect } from "vitest";
import { User } from "../../entities/user";
import { userMock } from "../../entities/mocks";
import {
  MockedUserService,
  usersServiceMock,
} from "../../services/mocks/user-service-mock";
import {
  register,
  RegisterDependencies,
} from "./register";
import { AuthService } from "../../services";
import { cryptoServiceMock } from "../../services/mocks/crypto-service-mock";
import { authServiceMock } from "../../services/mocks/auth-service-mock";
import { InvalidDataError, UserAlreadyExistError } from "../../errors/errors";
import { RegisterPayload } from "../../types";

describe("register", () => {
  let userService: MockedUserService;
  let authService: AuthService;
  let dependencies: RegisterDependencies;
  let existUser = userMock({password: "#Hash#@User1234"})
  beforeEach(() => {
    userService = usersServiceMock([existUser]);
    authService = authServiceMock();
    dependencies = {
      userService,
      authService,
    };
  });
  test("Should register user", async () => {
    const payload: User = userMock({ password: "User@1234" });
    const result = await register(dependencies, payload);

    expect(result).toEqual(expect.any(Object));
    expect(result.user).toEqual(expect.any(Object));
    expect(result.token).toEqual(`JWT\"${result.user.id}\"`);
    expect(result.user.name).toEqual(payload.name);
    expect(result.user.surname).toEqual(payload.surname);
    expect(result.user.email).toEqual(payload.email.toLowerCase());
    expect(result.user.role).toEqual(payload.role);

    const isHashedUserPassword = await authService.comparePassword(payload.password, userService.users[1].password)
    expect(isHashedUserPassword).toBeTruthy();
  });
  test("Should throw InvalidDataError with all validation messages for an invalid payload", async () => {
  const invalidPayload = userMock({
    name: "",
    surname: " ",
    email: "invalid-email",
    password: "invalid",
  });

  const expectedContext = {
    name: "The name is required",
    surname: "The surname is required",
    email: "Invalid Email",
    password: "Invalid Password",
  };

  try {
    await register(dependencies, invalidPayload);
    expect.fail("The function did not throw an error.");

  } catch (error) {
    expect(error).toBeInstanceOf(InvalidDataError);
    expect((error as InvalidDataError).context).toEqual(expectedContext);
  }
});
  test("should throw UserAlreadyExistError if user email is already in use", async () => {
    const payload: RegisterPayload = {
      name: "any Name",
      email: existUser.email,
      password: "Pass@123",
      surname: "any surname",
    };
    
    await expect(register(dependencies, payload)).rejects.toThrow(
      UserAlreadyExistError
    );
  });
});
