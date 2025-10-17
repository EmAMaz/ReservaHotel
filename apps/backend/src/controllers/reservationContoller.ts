import { Reservation, ReservationUsesCases } from "domain-core";
import { Request, Response } from "express";

export class ReservationController {
  constructor(private reservationUsesCases: ReservationUsesCases) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body) throw new Error("Data is null");
      const { date, status, guest, room, priceTotal } = req.body;

      const reservation: Omit<Reservation, "id"> = {
        date,
        status,
        guest,
        room,
        priceTotal,
      };

      const result = await this.reservationUsesCases.save(reservation);

      res
        .status(201)
        .json({ status: "Success", message: "Reservation created", data: result });
    } catch (err) {
      console.log(Error);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.reservationUsesCases.getAll();
      res
        .status(200)
        .json({ status: "Success", message: "Reservations found", data: result });
    } catch (err) {
      console.log(Error);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      if(!req.params.id) throw new Error("Id is null");
      const result = await this.reservationUsesCases.getById(req.params.id);
      res
        .status(200)
        .json({ status: "Success", message: "Reservation found", data: result });
    } catch (err) {
      console.log(Error);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }
}
