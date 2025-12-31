import type { Room } from "../entities/Room";
import { NotFoundError } from "../errors";
import { RoomRepository } from "../repository/RoomRepository";

export class RoomUsesCases {
  constructor(private roomRepository: RoomRepository) {}

  async getAll(): Promise<Room[]> {
    const result = await this.roomRepository.getAll();
    return result;
  }


  async getById(id: string): Promise<Room | null> {
    const result = await this.roomRepository.getById(id);
    if(!result) throw new NotFoundError("Room not found")
    return result;
  }

  async save(room: Omit<Room, "id">): Promise<void> {
    await this.roomRepository.save(room);
  }

  async update(id: string, room: Omit<Room, "id">): Promise<void> {
    const result = await this.roomRepository.getById(id);
    if(!result) throw new NotFoundError("Room not found")

    await this.roomRepository.update(id, room);
  }

  async delete(id: string): Promise<void> {
    const result = await this.roomRepository.getById(id);
    if(!result) throw new NotFoundError("Room not found")
      
    await this.roomRepository.delete(id);
  }
}
