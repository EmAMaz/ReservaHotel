import { Guest } from "../entities/Guest";

export interface GuestRepository {
    getAll(): Promise<Guest[]>;
    getById(id: string): Promise<Guest | null>;
    save(guest: Omit<Guest, "id">): Promise<void>;
    findByEmail(email: string): Promise<Guest | null>;
    update(id: string, guest: Omit<Guest, "id" | "email">): Promise<void>;
    delete(id: number): Promise<void>;
}
