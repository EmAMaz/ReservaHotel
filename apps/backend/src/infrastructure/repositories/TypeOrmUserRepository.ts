import { DataSource, Repository } from "typeorm";
import { User, UserRepository } from "domain-core";
import { User as UserModel } from "../../models/UserModel";
import { comparePassword } from "../../utils/cryptoPassword";

export class TypeOrmUserRepository implements UserRepository {
  private typeOrmUserRepository: Repository<UserModel>;
  constructor(private dataSource: DataSource) {
    this.typeOrmUserRepository = dataSource.getRepository(UserModel);
  }

  async save(User: Omit<User, "id">): Promise<User> {
    const findForEmail = await this.typeOrmUserRepository.findOne({
      where: {
        email: User.email,
      },
    })
    if(findForEmail) throw new Error("User registered");
    const result = await this.typeOrmUserRepository.save(User);
    return result;
  }

  async login(email: string, password: string): Promise<User> {
    const result = await this.typeOrmUserRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!result) throw new Error("Credentials are incorrect");
    return result;
  }
}
