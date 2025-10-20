import { DataSource, Repository } from "typeorm";
import { AuthenticationError, ConflictError, User, UserRepository } from "domain-core";
import { User as UserModel } from "../../models/UserModel";
import { comparePassword } from "../../utils/cryptoPassword";

export class TypeOrmUserRepository implements UserRepository {
  private typeOrmUserRepository: Repository<UserModel>;
  constructor(private dataSource: DataSource) {
    this.typeOrmUserRepository = dataSource.getRepository(UserModel);
  }

  async save(User: Omit<User, "id">): Promise<void> {
    const findForEmail = await this.typeOrmUserRepository.findOne({
      where: {
        email: User.email,
      },
    })
    if(findForEmail) throw new ConflictError("User registered");
    await this.typeOrmUserRepository.save(User);
  }

  async login(email: string, password: string): Promise<User> {
    const result = await this.typeOrmUserRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!result) throw new AuthenticationError("User not registered in the system");
    const resultPasswordCompare = comparePassword(password, result.password);
    if(!resultPasswordCompare) throw new AuthenticationError("Credentials incorrect");
    
    return result;
  }
}
