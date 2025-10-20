import { describe, test, expect, vi, Mock } from "vitest";
import { ReservationRepository } from "../repository";
import { ReservationUsesCases } from "./reservationUsesCases";
import { Reservation, Guest } from "../entities";
import { ReservationStatus, RoomType } from "../enums";
import { afterEach } from "node:test";

const mockReservationRepository: ReservationRepository = {
  getAll: vi.fn(),
  getById: vi.fn(),
  save: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const reservationUsesCases = new ReservationUsesCases(
  mockReservationRepository
);

const expectReservation: Reservation = {
  id: 999,
  date: "2023-01-01",
  guest: {
    id: 999,
    name: "John",
    lastname: "Doe",
    email: "Gv6dA@example.com",
    password: "password",
  },
  room: {
    id: 999,
    roomNumber: 21,
    description: "Room 21",
    type: RoomType.STANDARD,
    image: "",
    capacity: 2,
    price: 100,
  },
  priceTotal: 200,
  status: ReservationStatus.CONFIRMED,
};

describe("ReservationUsesCases", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  test("getAll debe devolver la lista de reservaciones", async () => {
    vi.mocked(mockReservationRepository).getAll.mockResolvedValue([
      expectReservation,
    ]);

    const result = await reservationUsesCases.getAll();

    expect(mockReservationRepository.getAll).toHaveBeenCalledTimes(1);

    expect(result).toEqual([expectReservation]);
  });

  test("getById debe llamar al repositorio con el ID correcto y retornar la reservación encontrada", async () => {
    const expectedId = "12";

    vi.mocked(mockReservationRepository).getById.mockResolvedValue(
      expectReservation
    );

    const result = await reservationUsesCases.getById(expectedId);

    expect(mockReservationRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockReservationRepository.getById).toHaveBeenCalledWith(expectedId);

    expect(result).toEqual(expectReservation);
  });

  test("save debe llamar al repositorio con la reservacion y guardalo", async () => {
    vi.mocked(mockReservationRepository).save.mockResolvedValue(void 0);

    const result = await reservationUsesCases.save(expectReservation);

    expect(mockReservationRepository.save).toHaveBeenCalledTimes(1);
    expect(mockReservationRepository.save).toHaveBeenCalledWith(
      expectReservation
    );

    expect(result).toEqual(undefined);
  });

  test("delete debe llamar al repositorio con el ID correcto", async () => {
    const expectedId = "1";

    vi.mocked(mockReservationRepository.delete).mockResolvedValue(undefined);
    await reservationUsesCases.delete(expectedId);

    expect(mockReservationRepository.delete).toHaveBeenCalledTimes(1);

    expect(mockReservationRepository.delete).toHaveBeenCalledWith(expectedId);
  });
});
