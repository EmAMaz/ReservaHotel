import { RoomUsesCases, Room, AppError, ValidationError } from "domain-core";
import { Request, Response } from "express";

export class RoomController {
  constructor(private RoomUsesCases: RoomUsesCases) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body) throw new ValidationError();
      const { roomNumber, type, capacity, description, image, price } = req.body;

      const Room: Omit<Room, "id"> = {
        roomNumber,
        type,
        capacity,
        description,
        image,
        price,
      };

      await this.RoomUsesCases.save(Room);

      res.status(201).json({ message: "Room created" });
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
      if (req.query.filter === "unique") {
        const result = await this.RoomUsesCases.findUniqueRoomsByType();
        res
          .status(200)
          .json({ status: "Success", message: "Rooms found", data: result });
      } else {
        const result = await this.RoomUsesCases.getAll();
        res.status(200).json({ message: "Rooms found", data: result });
      }
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
      const result = await this.RoomUsesCases.getById(req.params.id);
      res.status(200).json({ message: "Room found", data: result });
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
      const { roomNumber, type, capacity, description, image, price } = req.body;
      const Room: Omit<Room, "id"> = {
        roomNumber,
        type,
        capacity,
        description,
        image,
        price,
      };
      await this.RoomUsesCases.update(req.params.id, Room);
      res.status(200).json({ message: "Room updated" });
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

      await this.RoomUsesCases.delete(req.params.id);
      res.status(204).json({ message: "Room deleted" });
    } catch (err) {
      console.log(Error);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }
}
