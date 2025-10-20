import { AppError, Reservation, ReservationUsesCases, ValidationError } from "domain-core";
import { Request, Response } from "express";

export class ReservationController {
  constructor(private reservationUsesCases: ReservationUsesCases) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body) throw new ValidationError();
      const { date, status, guest, room, priceTotal } = req.body;

      const reservation: Omit<Reservation, "id"> = {
        date,
        status,
        guest,
        room,
        priceTotal,
      };

      await this.reservationUsesCases.save(reservation);

      res.status(201).json({ message: "Reservation created" });
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
      const result = await this.reservationUsesCases.getAll();
      res.status(200).json({ message: "Reservations found", data: result });
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
      const result = await this.reservationUsesCases.getById(req.params.id);
      res.status(200).json({
        message: "Reservation found",
        data: result
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

  async update(req: Request, res: Response): Promise<void> {
    try {
      if(!req.body || Object.keys(req.body).length === 0 || !req.params.id) throw new ValidationError(); 
      const { date, status, guest, room, priceTotal } = req.body;
      const reservation: Omit<Reservation, "id"> = {
        date,
        status,
        guest,
        room,
        priceTotal,
      };
      await this.reservationUsesCases.update(req.params.id, reservation);

      res.status(200).json({ message: "Reservation updated" });
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

      await this.reservationUsesCases.delete(req.params.id);
      res.status(200).json({ message: "Reservation deleted" });
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
