import { describe, beforeEach, test, expect } from "vitest";
import { userMock } from "../../entities/mocks";
import {
  MockedUserService,
  usersServiceMock,
} from "../../services/mocks/user-service-mock";
import { login, LoginDependencies, LoginPayload } from "./login";
import { AuthService } from "../../services";
import { authServiceMock } from "../../services/mocks/auth-service-mock";
import {
  InvalidCredentialsError,
  InvalidDataError,
} from "../../errors/errors";

describe("Login", () => {
  let userService: MockedUserService;
  let authService: AuthService;
  let dependencies: LoginDependencies;
  let existUser = userMock();
  beforeEach(async () => {
    authService = authServiceMock();
    existUser.password = await authService.hashPassword("@User1234");
    userService = usersServiceMock([existUser]);
    dependencies = {
      userService,
      authService,
    };
  });
  test("Should register user", async () => {
    const payload: LoginPayload = {
      email: existUser.email,
      password: "@User1234",
    };

    console.log(existUser);

    const result = await login(dependencies, payload);

    expect(result).toEqual(expect.any(Object));
    expect(result.user).toEqual(expect.any(Object));
    expect(result.token).toEqual(`JWT\"${result.user.id}\"`);
    expect(result.user.name).toEqual(existUser.name);
    expect(result.user.surname).toEqual(existUser.surname);
    expect(result.user.email).toEqual(existUser.email);
    expect(result.user.role).toEqual(existUser.role);

    const isHashedUserPassword = await authService.comparePassword(
      payload.password,
      userService.users[0].password
    );
    expect(isHashedUserPassword).toBeTruthy();
  });
  test("Should throw InvalidDataError with all validation messages for an invalid payload", async () => {
    const invalidPayload = {
      email: "invalid-email",
      password: "",
    };

    const expectedContext = {
      email: "Invalid Email",
    };

    try {
      await login(dependencies, invalidPayload);
      expect.fail("The function did not throw an error.");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidDataError);
      expect((error as InvalidDataError).context).toEqual(expectedContext);
    }
  });
  test("should throw InvalidCredentialsError if user password is invalid", async () => {
    const payload = {
      email: existUser.email,
      password: "",
    };

    await expect(login(dependencies, payload)).rejects.toThrow(
      InvalidCredentialsError
    );
  });
  test("should throw InvalidCredentialsError if user email is invalid", async () => {
    const payload = {
      email: "non-Exist@gmail.com",
      password: "@User1234",
    };

    await expect(login(dependencies, payload)).rejects.toThrow(
      InvalidCredentialsError
    );
  });
});
