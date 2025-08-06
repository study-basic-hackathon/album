export default class AppError extends Error {
  constructor(message, code, cause = null) {
    super(message, { cause });
    this.name = new.target.name;
    this.code = code;
    this.cause = cause;
  }

  static notFound(message = "Resource not found", cause = null) {
    return new AppError(message, AppError.codes.NOT_FOUND, cause);
  }

  static validationError(message = "Validation error", cause = null) {
    return new AppError(message, AppError.codes.VALIDATION_ERROR, cause);
  }

  static internalError(message = "Internal server error", cause = null) {
    return new AppError(message, AppError.codes.INTERNAL_ERROR, cause);
  }

  static sqlError(message = "SQL execution failed", cause = null) {
    return new AppError(message, AppError.codes.SQL_ERROR, cause);
  }
}

AppError.codes = {
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SQL_ERROR: "SQL_ERROR",
};
