import { DataSource, Repository } from "typeorm";
import { Room as IRoom, RoomRepository } from "domain-core";
import { Room as RoomModel } from "../../models/RoomModel";

export class TypeOrmRoomRepository implements RoomRepository {
  private typeOrmRepository: Repository<RoomModel>;
  constructor(private dataSource: DataSource) {
    this.typeOrmRepository = dataSource.getRepository(RoomModel);
  }

  async save(room: IRoom): Promise<void> {
    await this.typeOrmRepository.save(room);
  }

  async getAll(): Promise<IRoom[]> {
    const result = await this.typeOrmRepository.find({
      order: {
        price: "ASC",
      },
    });
    return result;
  }

  async getById(id: string): Promise<IRoom> {
    const result = await this.typeOrmRepository.findOne({
      where: { id: Number(id) },
      relations: {
        reservations: true,
      },
    });
    if (result) return result;
    else throw new Error("Room not found");
  }

  async update(id: string, Room: Omit<IRoom, "id">): Promise<void> {
    await this.typeOrmRepository.update({ id: Number(id) }, Room);
  }

  async delete(id: string): Promise<void> {
    await this.typeOrmRepository.delete({ id: Number(id) });
  }
}
