import { AppError } from "./AppError";

export class AuthenticationError extends AppError {
   constructor(
    message: string = "",
    public readonly resourceName?: string
  ) {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}