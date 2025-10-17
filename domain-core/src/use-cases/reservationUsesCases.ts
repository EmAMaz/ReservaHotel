import { Reservation } from "../entities/Reservation";
import type { Room } from "../entities/Room";
import { ReservationRepository } from "../repository/ReservationRepository";

export class ReservationUsesCases implements ReservationRepository {
  constructor(private ReservationRepository: ReservationRepository) {}

  async getAll(): Promise<Reservation[]> {
    const result = await this.ReservationRepository.getAll();
    return result;
  }

  async getById(id: string): Promise<Reservation> {
    const result = await this.ReservationRepository.getById(id);
    return result;
  }

  async save(reservation: Omit<Reservation, "id">): Promise<Reservation> {
    const result = await this.ReservationRepository.save(reservation);
    return result;
  }

  async update(
    id: string,
    reservation: Omit<Reservation, "id">
  ): Promise<void> {
    await this.ReservationRepository.update(id, reservation);
  }

  async delete(id: string): Promise<void> {
    await this.ReservationRepository.delete(id);
  }
}
