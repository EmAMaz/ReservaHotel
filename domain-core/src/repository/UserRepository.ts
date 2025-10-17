import { User } from "../entities/User";

export interface UserRepository {
    save(user: Omit<User, "id">): Promise<User>;
    login(email: string, password: string): Promise<User>;
}
