import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(
    message: string = "Resource not found.",
    public readonly resourceName?: string
  ) {
    super(message, 404);
    this.name = "Not Found";
  }
}
