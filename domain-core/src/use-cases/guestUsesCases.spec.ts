import { describe, test, expect, vi, Mock, afterEach } from "vitest";
import { GuestRepository } from "../repository";
import { GuestUsesCases } from "./guestUsesCases";
import { Guest } from "../entities";

const mockGuestRepository: GuestRepository = {
  getAll: vi.fn(),
  getById: vi.fn(),
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
};

describe("GuestUsesCases", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  test("getAll debe devolver la lista de huéspedes", async () => {
    (mockGuestRepository.getAll as Mock).mockResolvedValue([expectedGuest]);

    const result = await guestUsesCases.getAll();

    expect(mockGuestRepository.getAll).toHaveBeenCalledTimes(1);

    expect(result).toEqual([expectedGuest]);
  });

  test("getById debe llamar al repositorio con el ID correcto y retornar el huésped encontrado", async () => {
    const expectedId = "12";

    vi.spyOn(mockGuestRepository, "getById").mockResolvedValue(expectedGuest);

    const result = await guestUsesCases.getById(expectedId);

    expect(mockGuestRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockGuestRepository.getById).toHaveBeenCalledWith(expectedId);

    expect(result).toEqual(expectedGuest);
  });

  test("save debe llamar al repositorio con el huésped correcto y retornar el huésped guardado", async () => {
    vi.mocked(mockGuestRepository).save.mockResolvedValue(expectedGuest);

    const result = await guestUsesCases.save(expectedGuest);

    expect(mockGuestRepository.save).toHaveBeenCalledTimes(1);
    expect(mockGuestRepository.save).toHaveBeenCalledWith(expectedGuest);

    expect(result).toEqual(expectedGuest);
  });

  test("delete debe llamar al repositorio con el ID correcto", async () => {
    const expectedId = "1";

    await guestUsesCases.delete(expectedId);

    expect(mockGuestRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockGuestRepository.delete).toHaveBeenCalledWith(expectedId);

    expect(mockGuestRepository.delete).toBeCalledTimes(1);
  });
});
