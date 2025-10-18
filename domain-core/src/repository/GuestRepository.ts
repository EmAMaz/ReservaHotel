import { Guest } from "../entities/Guest";

export interface GuestRepository {
    getAll(): Promise<Guest[]>;
    getById(id: string): Promise<Guest>;
    save(guest: Omit<Guest, "id">): Promise<Guest>;
    update(id: string, guest: Omit<Guest, "id">): Promise<void>;
    delete(id: string): Promise<void>;
}
