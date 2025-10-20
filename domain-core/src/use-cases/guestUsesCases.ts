import { Guest } from "../entities/Guest";
import { ConflictError, NotFoundError } from "../errors";
import { GuestRepository } from "../repository";

export class GuestUsesCases implements GuestRepository {
  constructor(private guestRepository: GuestRepository) {}

  async getAll(): Promise<Guest[]> {
    const result = await this.guestRepository.getAll();
    return result;
  }
  async getById(id: string): Promise<Guest | null> {
    const result = await this.guestRepository.getById(id);
    if(!result) throw new NotFoundError("Guest not found");
    return result;
  }

  async findByEmail(email: string): Promise<Guest | null> {
    const result = await this.guestRepository.findByEmail(email);
    return result;
  }

  async save(guest: Omit<Guest, "id">): Promise<void> {
    const findByEmail = await this.findByEmail(guest.email);
    if (findByEmail) throw new ConflictError();

    await this.guestRepository.save(guest);
  }
  async update(id: string, guest: Omit<Guest, "id" | "email">): Promise<void> {
    const findById = await this.guestRepository.getById(id);
    if (!findById) throw new NotFoundError();

    await this.guestRepository.update(id, guest);
  }
  async delete(id: string): Promise<void> {
    const findById = await this.guestRepository.getById(id);
    if (!findById) throw new NotFoundError();
    
    await this.guestRepository.delete(Number(id));
  }
}
