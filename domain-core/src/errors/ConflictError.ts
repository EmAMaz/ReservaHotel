import { AppError } from "./AppError";

export class ConflictError extends AppError {
  constructor(
    message: string = "The requested resource already exists.",
    public readonly resourceName?: string
  ) {
    super(message, 409);
    this.name = "ConflictError";
  }
}
