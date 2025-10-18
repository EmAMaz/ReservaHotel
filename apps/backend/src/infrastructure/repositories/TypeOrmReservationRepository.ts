import { Reservation as ReservationI, ReservationRepository } from "domain-core";
import { Reservation as ReservationModel } from "../../models/ReservationModel";
import { DataSource, Repository } from "typeorm";

export class TypeOrmReservationRepository implements ReservationRepository {
  private typeOrmReservationRepostory: Repository<ReservationModel>;
  constructor(private dataSource: DataSource) {
    this.typeOrmReservationRepostory = dataSource.getRepository(ReservationModel);
  }

  async save(reservation: Omit<ReservationI, "id" | "roomId">): Promise<ReservationI> {
    const result = await this.typeOrmReservationRepostory.save(reservation);
    return result;
  }

  async getAll(): Promise<ReservationI[]> {
    const result = await this.typeOrmReservationRepostory.find({
      relations: {
        guest: true,
        room: true
      }
    });
    return result;
  }

  async getById(id: string): Promise<ReservationI> {
    const result = await this.typeOrmReservationRepostory.findOne({
      where: {id: Number(id)},
      relations: {
        guest: true,
        room: true
      }
    })
    if(!result) throw new Error("Reservation not found");
    return result
  }

  update(id: string, reservation: Omit<ReservationI, "id">): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
