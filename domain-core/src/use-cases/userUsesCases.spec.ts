import { describe, test, expect, vi, Mock, afterEach } from "vitest";
import { User } from "../entities";
import { UserRepository } from "../repository";
import { UserUsesCases } from "./userUsesCases";

const mockUserRepository: UserRepository = {
  save: vi.fn(),
  login: vi.fn(),
};

const userUsesCases = new UserUsesCases(mockUserRepository);

const expectedUser: User = {
  id: 999,
  name: "John",
  lastname: "Doe",
  email: "Gv6dA@example.com",
  password: "password",
};

describe("UserUsesCases", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  test("save debe llamar al repositorio con el usuario ingresado y retornarlo", async () => {
    vi.mocked(mockUserRepository).save.mockResolvedValue(expectedUser);

    const result = await userUsesCases.save(expectedUser);

    expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.save).toHaveBeenCalledWith(expectedUser);

    expect(result).toEqual(expectedUser);
  });

  test("login debe llamar al repositorio con el usuario correcto y retornar el usuario encontrado", async () => {
    vi.mocked(mockUserRepository).login.mockResolvedValue(expectedUser);

    const result = await userUsesCases.login(
      expectedUser.email,
      expectedUser.password
    );

    expect(mockUserRepository.login).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.login).toHaveBeenCalledWith(
      expectedUser.email,
      expectedUser.password
    );

    expect(result).toEqual(expectedUser);
  });
});
