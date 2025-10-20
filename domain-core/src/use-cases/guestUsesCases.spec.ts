import { describe, test, expect, vi, afterEach } from "vitest";
import { GuestRepository } from "../repository";
import { GuestUsesCases } from "./guestUsesCases";
import { Guest } from "../entities";
import { NotFoundError } from "../errors";

const mockGuestRepository: GuestRepository = {
  getAll: vi.fn(),
  getById: vi.fn(),
  findByEmail: vi.fn(),
  save: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const guestUsesCases = new GuestUsesCases(mockGuestRepository);

const expectedGuest: Guest = {
  id: 999,
  name: "John",
  lastname: "Doe",
  email: "Gv6dA@example.com",
  password: "password",
};

describe("GuestUsesCases", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  test("getAll debe devolver la lista de huéspedes", async () => {
    vi.mocked(mockGuestRepository.getAll).mockResolvedValue([expectedGuest]);

    const result = await guestUsesCases.getAll();

    expect(mockGuestRepository.getAll).toHaveBeenCalledTimes(1);

    expect(result).toEqual([expectedGuest]);
  });

  test("getById debe llamar al repositorio con el ID correcto y retornar el huésped encontrado", async () => {
    const expectedId = "999";

    vi.mocked(mockGuestRepository).getById.mockResolvedValue(expectedGuest);

    const result = await guestUsesCases.getById(expectedId);

    expect(mockGuestRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockGuestRepository.getById).toHaveBeenCalledWith(expectedId);

    expect(result).toEqual(expectedGuest);
  });

  test("save debe llamar al repositorio con el huésped y guardalo", async () => {
    vi.mocked(mockGuestRepository).save.mockResolvedValue(void 0);

    const result = await guestUsesCases.save(expectedGuest);

    expect(mockGuestRepository.save).toHaveBeenCalledTimes(1);
    expect(mockGuestRepository.save).toHaveBeenCalledWith(expectedGuest);

    expect(result).toEqual(undefined);
  });

  test("si el metodo delete no encuentra el guest devuelve un throw", async () => {
    const expectedId = "1";

    expect(guestUsesCases.delete(expectedId)).rejects.toThrow(NotFoundError);
  });
  test("si el metodo delete encuentra el guest, debe eliminarlo y devolver void o undefined", async () => {
    const expectedId = "1";
    const guestMocked: Guest = {
      id: Number(expectedId),
      name: "John",
      lastname: "Doe",
      email: "Gv6dA@example.com",
      password: "password",
    }

    vi.mocked(mockGuestRepository).getById.mockResolvedValue(guestMocked);
    vi.mocked(mockGuestRepository).delete.mockResolvedValue(undefined);

    const result = await guestUsesCases.delete(expectedId);

    expect(mockGuestRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockGuestRepository.getById).toHaveBeenCalledWith(expectedId);

    expect(mockGuestRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockGuestRepository.delete).toHaveBeenCalledWith(Number(expectedId));

    expect(result).toBeUndefined();
  });
});
