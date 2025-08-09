import { BaseError } from "../utils/errors/base-error.js";

export class NotFoundError extends BaseError<"NOT_FOUND_ERROR"> {
    constructor(errors?: Record<string, string | undefined>) {
        super(
          "NOT_FOUND_ERROR",
          404,
          errors
        );
    }
}

export class InvalidDataError extends BaseError<'INVALID_DATA_ERROR'> {
  constructor(errors?: Record<string, string>) {
    super(
      'INVALID_DATA_ERROR',
      400,
      errors
    );
  }
}

export class UserAlreadyExistError extends BaseError<"USER_ALREADY_EXIST_ERROR"> {
  constructor() {
    super(
      'USER_ALREADY_EXIST_ERROR',
      409,
      { message: "User Already Exist"}
    );
  }
}
export class InvalidCredentialsError extends BaseError<"INVALID_CREDENTIALS_ERROR"> {
  constructor(errors?: Record<string, string>) {
    super(
      'INVALID_CREDENTIALS_ERROR',
      401,
      errors
    );
  }
}
export class UnexpectedError extends BaseError<"UNEXPECTED_ERROR"> {
  constructor(errors?: Record<string, string>) {
    super(
      'UNEXPECTED_ERROR',
      500,
      errors
    );
  }
}
export class ForbiddenError extends BaseError<"FORBIDDEN_ERROR"> {
  constructor(errors?: Record<string, string>) {
    super(
      'FORBIDDEN_ERROR',
      403,
      errors
    );
  }
}