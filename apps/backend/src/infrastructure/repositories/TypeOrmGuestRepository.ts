import { GuestRepository, Guest as GuestI } from "domain-core";
import { Guest as GuestModel } from "../../models/GuestModel";
import { DataSource, Repository } from "typeorm";

export class TypeOrmGuestRepostory implements GuestRepository {
  private typeOrmGuestRepostory: Repository<GuestModel>;
  constructor(private dataSource: DataSource) {
    this.typeOrmGuestRepostory = dataSource.getRepository(GuestModel);
  }

  async save(guest: GuestI): Promise<any> {
    const result = await this.typeOrmGuestRepostory.save(guest);
    return result;
  }

  async getAll(): Promise<GuestI[]> {
    const result = await this.typeOrmGuestRepostory.find();
    return result;
  }

  async getById(id: string): Promise<GuestI> {
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

  async delete(id: string): Promise<void> {
    await this.typeOrmGuestRepostory.delete(id)
  }
}
