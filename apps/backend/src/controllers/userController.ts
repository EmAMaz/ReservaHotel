import { AppError, User, UserUsesCases, ValidationError } from "domain-core";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { encryptPassword } from "../utils/cryptoPassword";
import { withOutPassword } from "../utils/withOutPassword";
import { configDotenv } from "dotenv";

configDotenv()

export class UserController {
  constructor(private userUsesCases: UserUsesCases) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body) throw new ValidationError();
      const { name, email, lastname, password, role } = req.body;

      const user: Omit<User, "id"> = {
        name,
        email,
        lastname,
        password: encryptPassword(password),
        role,
      };

      await this.userUsesCases.save(user);
      res.status(201).json({ message: "User created" });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          error: error.name,
          message: error.message,
        });
      }
      console.log(error);
      res.status(500).json({
        error: "InternalServerError",
        message: "An unexpected error occurred.",
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    if (!req.body) throw new Error("Data is null");
    try {
      if(!req.body || Object.keys(req.body).length === 0) throw new ValidationError(); 
      const { email, password } = req.body;

      const result = await this.userUsesCases.login(email, password);

      const data = withOutPassword(result);

      const token = sign({ data }, process.env.API_KEY || "", { expiresIn: "1h" });

      res.status(200).json({
        status: "Success",
        message: "User logged in",
        data,
        token,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          error: error.name,
          message: error.message,
        });
      }
      console.log(error);
      res.status(500).json({
        error: "InternalServerError",
        message: "An unexpected error occurred.",
      });
    }
  }

  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ message: "User authenticated" });
    } catch (error) {
          if (error instanceof AppError) {
            res.status(error.statusCode).json({
              error: error.name,
              message: error.message,
            });
          }
          console.log(error);
          res.status(500).json({
            error: "InternalServerError",
            message: "An unexpected error occurred.",
          });
        }
  }
}
