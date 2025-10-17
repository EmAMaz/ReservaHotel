import { GuestRepository, GuestUsesCases, Guest as GuestI } from "domain-core";
import { Guest } from "../../models/GuestModel";
import { DataSource, Repository } from "typeorm";

export class TypeOrmGuestRepostory implements GuestRepository {
  private typeOrmGuestRepostory: Repository<Guest>;
  constructor(private dataSource: DataSource) {
    this.typeOrmGuestRepostory = dataSource.getRepository(Guest);
  }

  async save(guest: any): Promise<any> {
    const result = await this.typeOrmGuestRepostory.save(guest);
    return result;
  }

  async getAll(): Promise<any> {
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

  async update(id: string, guest: Omit<any, "id">): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
