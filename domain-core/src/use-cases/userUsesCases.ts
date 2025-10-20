import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";

export class UserUsesCases {
  constructor(private userRepository: UserRepository) {}

  async save(user: Omit<User, "id">): Promise<void> {
    await this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<User> {
    const result = await this.userRepository.login(email, password);
    return result;
  }
}
