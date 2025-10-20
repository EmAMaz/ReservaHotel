import { AppError } from "./AppError";

export class ValidationError extends AppError {
  constructor(message: string = "The information provided is invalid.") {
    super(message, 400);
  }
}
