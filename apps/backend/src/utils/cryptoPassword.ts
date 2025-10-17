import { compareSync, hashSync } from "bcrypt";

export const encryptPassword = (password: string): string => {
  return hashSync(password, 10);
};

export const comparePassword = (password: string, hash: string): boolean => {
  return compareSync(password, hash);
};
