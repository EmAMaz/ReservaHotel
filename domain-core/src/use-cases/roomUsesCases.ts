import type { Room } from "../entities/Room";
import { RoomRepository } from "../repository/RoomRepository";

export class RoomUsesCases implements RoomRepository {
  constructor(private roomRepository: RoomRepository) {}

  async getAll(): Promise<Room[]> {
    const result = await this.roomRepository.getAll();
    return result;
  }

  async findUniqueRoomsByType(): Promise<Room[]> {
    const result = await this.roomRepository.findUniqueRoomsByType();
    return result;
  }

  async getById(id: string): Promise<Room> {
    const result = await this.roomRepository.getById(id);
    return result;
  }

  async save(room: Omit<Room, "id">): Promise<Room> {
    const result = await this.roomRepository.save(room);
    return result;
  }

  async update(id: string, room: Omit<Room, "id">): Promise<void> {
    await this.roomRepository.update(id, room);
  }

  async delete(id: string): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
