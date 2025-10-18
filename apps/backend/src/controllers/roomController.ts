import { RoomUsesCases, Room } from "domain-core";
import { Request, Response } from "express";

export class RoomController {
  constructor(private RoomUsesCases: RoomUsesCases) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body) throw new Error("Data is null");
      const { roomNumber, type, capacity, description, image, price } =
        req.body;

      const Room: Omit<Room, "id"> = {
        roomNumber,
        type,
        capacity,
        description,
        image,
        price,
      };

      const result = await this.RoomUsesCases.save(Room);

      res
        .status(201)
        .json({ status: "Success", message: "Room created", data: result });
    } catch (err) {
      console.log(Error);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
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
        res
          .status(200)
          .json({ status: "Success", message: "Rooms found", data: result });
      }
    } catch (err) {
      console.log(Error);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) throw new Error("Id is null");
      const result = await this.RoomUsesCases.getById(req.params.id);
      res
        .status(200)
        .json({ status: "Success", message: "Room found", data: result });
    } catch (err) {
      console.log(Error);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      if(!req.params.id) throw new Error("Id is null");
      if (!req.body) throw new Error("Data is null");
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
      res.status(200).json({ status: "Success", message: "Room updated" });
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) throw new Error("Id is null");
      await this.RoomUsesCases.delete(req.params.id);
      res.status(200).json({ status: "Success", message: "Room deleted" });
    } catch (err) {
      console.log(Error);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }
}
