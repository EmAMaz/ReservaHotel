import { GuestRepository, Guest as GuestI, ConflictError } from "domain-core";
import { Guest as GuestModel } from "../../models/GuestModel";
import { DataSource, Repository } from "typeorm";

export class TypeOrmGuestRepostory implements GuestRepository {
  private typeOrmGuestRepostory: Repository<GuestModel>;
  constructor(private dataSource: DataSource) {
    this.typeOrmGuestRepostory = dataSource.getRepository(GuestModel);
  }

  async save(guest: GuestI): Promise<void> {
    const findForEmail = await this.typeOrmGuestRepostory.findOne({
      where: {
        email: guest.email,
      },
    });
    if (findForEmail) throw new ConflictError("Guest registered");
    await this.typeOrmGuestRepostory.save(guest);
  }

  async findByEmail(email: string): Promise<GuestI | null> {
    const result = await this.typeOrmGuestRepostory.findOne({
      where: {
        email,
      },
    });
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
    return result;
  }

  async update(id: string, guest: Omit<GuestI, "id">): Promise<void> {
    await this.typeOrmGuestRepostory.update(id, guest);
  }

  async delete(id: number): Promise<void> {
    await this.typeOrmGuestRepostory.delete(id);
  }
}
