import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";

export class UserUsesCases implements UserRepository {
  constructor(private userRepository: UserRepository) {}

  async save(user: Omit<User, "id">): Promise<User> {
    const result = await this.userRepository.save(user);
    return result;
  }

  async login(email: string, password: string): Promise<User> {
    const result = await this.userRepository.login(email, password);
    return result;
  }
}
