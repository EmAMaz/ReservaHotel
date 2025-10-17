import { UserType } from "../enums/UserType";

export interface User {
  id: number;
  name: string;
  lastname: string;
  password: string
  email: string;
  role?: UserType
}
