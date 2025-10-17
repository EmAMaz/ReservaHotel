import { Reservation } from "../entities/Reservation";

export interface ReservationRepository {
    getAll(): Promise<Reservation[]>;
    getById(id: string): Promise<Reservation>;
    save(reservation: Omit<Reservation, "id">): Promise<Reservation>;
    update(id: string, reservation: Omit<Reservation, "id">): Promise<void>;
    delete(id: string): Promise<void>;
}
