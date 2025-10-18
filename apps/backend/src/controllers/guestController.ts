import { Guest, GuestUsesCases } from "domain-core";
import { Request, Response } from "express";

export class GuestController {
  constructor(private guestUsesCases: GuestUsesCases) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body) throw new Error("Data is null");
      const { name, lastname, email } = req.body;

      const guest: Omit<Guest, "id"> = {
        name,
        email,
        lastname,
      };

      const result = await this.guestUsesCases.save(guest);

      res
        .status(201)
        .json({ status: "Success", message: "Guest created", data: result });
    } catch (err) {
      console.log(Error);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.guestUsesCases.getAll();
      res
        .status(200)
        .json({ status: "Success", message: "Guests found", data: result });
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      if(!req.params.id) throw new Error("Id is null");
      const result = await this.guestUsesCases.getById(req.params.id);
      res
        .status(200)
        .json({ status: "Success", message: "Guest found", data: result });
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) throw new Error("Id is null");
      if (!req.body) throw new Error("Data is null");
      const { name, email, lastname } = req.body;
      const guest: Omit<Guest, "id"> = {
        name,
        email,
        lastname,
      };
      await this.guestUsesCases.update(req.params.id, guest);

      res.status(200).json({ status: "Success", message: "Guest updated" });
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }
}
