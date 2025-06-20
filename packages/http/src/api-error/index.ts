export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(statusCode: number, message: string, isOperational = true, details?: any) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this);
  }
}

// Not found error
export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

// validation error - like zod error
export class ValidationError extends ApiError {
  constructor(message = 'Validation error', details?: any) {
    super(400, message, true, details);
  }
}

// bad request error
export class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(400, message);
  }
}

// unauthorized error
export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

// forbidden error
export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden access') {
    super(403, message);
  }
}

// conflict error
export class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}

// Rate limit error
export class RateLimitError extends ApiError {
  constructor(message = 'Too many requests, please try again later.') {
    super(429, message);
  }
}

//  Database error
export class DatabaseError extends ApiError {
  constructor(message = 'Database error') {
    super(500, message);
  }
}

// internal server error
export class InternalServerError extends ApiError {
  constructor(message = 'Internal server error') {
    super(500, message);
  }
}
