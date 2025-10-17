import { Guest } from "../entities/Guest";
import { GuestRepository } from "../repository";

export class GuestUsesCases implements GuestRepository {
  constructor(private guestRepository: GuestRepository) {}

  async getAll(): Promise<Guest> {
    const result = await this.guestRepository.getAll();
    return result;
  }
  async getById(id: string): Promise<Guest> {
    const result = await this.guestRepository.getById(id);
    return result;
  }
  async save(guest: Omit<Guest, "id">): Promise<Guest> {
    const result = await this.guestRepository.save(guest);
    return result;
  }
  async update(id: string, guest: Omit<Guest, "id">): Promise<void> {
    await this.guestRepository.update(id, guest);
  }
  async delete(id: string): Promise<void> {
    await this.guestRepository.delete(id);
  }
}
