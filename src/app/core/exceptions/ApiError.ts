import { AppError } from "./AppError";

export class ApiError extends AppError {
  readonly statusCode: number;

  constructor(message: string, code: string, statusCode = 400) {
    super(message, code);
    this.statusCode = statusCode;
  }
}
