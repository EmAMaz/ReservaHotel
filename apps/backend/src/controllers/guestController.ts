import { Guest, GuestUsesCases, AppError, ValidationError } from "domain-core";
import { Request, Response } from "express";
import { encryptPassword } from "../utils/cryptoPassword";

export class GuestController {
  constructor(private guestUsesCases: GuestUsesCases) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      if(!req.body || Object.keys(req.body).length === 0) throw new ValidationError(); 
      const { name, lastname, email, password } = req.body;
      const guest: Omit<Guest, "id"> = {
        name,
        email,
        lastname,
        password: encryptPassword(password),
      };

      await this.guestUsesCases.save(guest);
      res.status(201).json({ message: "Guest created" });
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

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.guestUsesCases.getAll();
      res.status(200).json({ message: "Guests found", data: result });
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

  async getById(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) throw new ValidationError(); 
      const result = await this.guestUsesCases.getById(req.params.id);
      res.status(200).json({ message: "Guest found", data: result });
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

  async update(req: Request, res: Response): Promise<void> {
    try {
      if(!req.body || Object.keys(req.body).length === 0 || !req.params.id) throw new ValidationError(); 
      const { name, lastname, password } = req.body;
      const guest: Omit<Guest, "id" | "email"> = {
        name,
        lastname,
        password: encryptPassword(password),
      };

      await this.guestUsesCases.update(req.params.id, guest);
      res.status(200).json({ message: "Guest updated" });
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

  async delete(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) throw new ValidationError(); 

      await this.guestUsesCases.delete(req.params.id);
      res.status(204).json({ message: "Guest deleted" });
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
