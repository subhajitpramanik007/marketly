export class ApiResponse<T extends object | null = null> {
  data: T;
  statusCode: number;
  message?: string;
  success = true;

  constructor(statusCode: number, data: T, message?: string) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class SuccessResponse<T extends object> extends ApiResponse<T> {
  constructor(data: T, message?: string) {
    super(200, data, message);
  }
}

export class CreatedResponse<T extends object> extends ApiResponse<T> {
  constructor(data: T, message?: string) {
    super(201, data, message);
  }
}

export class NoContentResponse extends ApiResponse<null> {
  constructor(message?: string) {
    super(204, null, message);
  }
}

export class OkResponse extends ApiResponse<null> {
  constructor(message?: string) {
    super(200, null, message);
  }
}
