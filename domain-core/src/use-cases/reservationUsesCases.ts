import { Reservation } from "../entities/Reservation";
import { NotFoundError } from "../errors";
import { ReservationRepository } from "../repository/ReservationRepository";

export class ReservationUsesCases implements ReservationRepository {
export class ReservationUsesCases {
  constructor(private reservationRepository: ReservationRepository) {}

  async getAll(): Promise<Reservation[]> {
    const result = await this.reservationRepository.getAll();
    return result;
  }

  async getById(id: string): Promise<Reservation | null> {
    const result = await this.reservationRepository.getById(id);
    if(!result) throw new NotFoundError("Reservation not found");
    return result;
  }

  async save(reservation: Omit<Reservation, "id">): Promise<void> {
    await this.reservationRepository.save(reservation);
  }

  async update(id: string,reservation: Omit<Reservation, "id">): Promise<void> {
    const findById = await this.reservationRepository.getById(id);
    if (!findById) throw new NotFoundError();

    await this.reservationRepository.update(id, reservation);
  }

  async delete(id: string): Promise<void> {
    const findById = await this.reservationRepository.getById(id);
    if (!findById) throw new NotFoundError();
    
    await this.reservationRepository.delete(id);
  }
}
