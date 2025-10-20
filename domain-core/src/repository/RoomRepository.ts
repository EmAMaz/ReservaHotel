import type { Room } from "../entities/Room";

export interface RoomRepository {
    getAll(): Promise<Room[]>
    findUniqueRoomsByType(): Promise<Room[]>
    getById(id: string): Promise<Room | null>
    save(room: Omit<Room, "id">): Promise<void>
    update(id: string, room: Omit<Room, "id">): Promise<void>
    delete(id: string): Promise<void>
}