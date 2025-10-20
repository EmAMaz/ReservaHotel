import { GuestRepository, Guest as GuestI } from "domain-core";
import { Guest as GuestModel } from "../../models/GuestModel";
import { DataSource, Repository } from "typeorm";

export class TypeOrmGuestRepostory implements GuestRepository {
  private typeOrmGuestRepostory: Repository<GuestModel>;
  constructor(private dataSource: DataSource) {
    this.typeOrmGuestRepostory = dataSource.getRepository(GuestModel);
  }

    const result = await this.typeOrmGuestRepostory.save(guest);
  async save(guest: GuestI): Promise<void> {
    return result;
  }

  async getAll(): Promise<GuestI[]> {
    const result = await this.typeOrmGuestRepostory.find();
    return result;
  }

  async getById(id: string): Promise<GuestI | null> {
    const result = await this.typeOrmGuestRepostory.findOne({
      where: {
        id: Number(id),
      },
      relations: {
        reservations: true,
      },
    });
    if(!result) throw new Error("Guest not found");
    return result;
  }

  async update(id: string, guest: Omit<GuestI, "id">): Promise<void> {
    await this.typeOrmGuestRepostory.update(id, guest);
  }

    await this.typeOrmGuestRepostory.delete(id)
  async delete(id: number): Promise<void> {
  }
}
