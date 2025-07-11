export default class AppError extends Error {
  constructor(message, cause = null) {
    super(message, { cause });
    this.name = new.target.name;
    this.cause = cause;
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", cause = null) {
    super(message, cause);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation error", cause = null) {
    super(message, cause);
  }
}

export class InternalError extends AppError {
  constructor(message = "Internal server error", cause = null) {
    super(message, cause);
  }
}