import { describe, test, expect, vi, Mock, afterEach } from "vitest";
import { Room } from "../entities/Room";
import { RoomType } from "../enums";
import { RoomUsesCases } from "./roomUsesCases";
import { RoomRepository } from "../repository";

const mockRoomRepository: RoomRepository = {
  getAll: vi.fn(),
  getById: vi.fn(),
  findUniqueRoomsByType: vi.fn(),
  save: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const roomUsesCases = new RoomUsesCases(mockRoomRepository);

const expectedRoom: Room = {
  id: 999,
  roomNumber: 21,
  description: "Room 21",
  type: RoomType.STANDARD,
  price: 100,
  image: "",
  capacity: 2,
};

describe("RoomUsesCases", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  test("getAll debe devolver la lista de habitaciones", async () => {
    vi.mocked(mockRoomRepository).getAll.mockResolvedValue([expectedRoom]);

    const result = await roomUsesCases.getAll();

    expect(mockRoomRepository.getAll).toHaveBeenCalledTimes(1);

    expect(result).toEqual([expectedRoom]);
  });

  test("getById debe llamar al repositorio con el ID correcto y retornar la habitación encontrada", async () => {
    const expectedId = "12";

    vi.mocked(mockRoomRepository).getById.mockResolvedValue(expectedRoom);

    const result = await roomUsesCases.getById(expectedId);

    expect(mockRoomRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRoomRepository.getById).toHaveBeenCalledWith(expectedId);

    expect(result).toEqual(expectedRoom);
  });

  test("save debe llamar al repositorio con la habitación correcta y retornar la habitación guardada", async () => {
    vi.mocked(mockRoomRepository).save.mockResolvedValue(expectedRoom);

    const result = await roomUsesCases.save(expectedRoom);

    expect(mockRoomRepository.save).toHaveBeenCalledTimes(1);
    expect(mockRoomRepository.save).toHaveBeenCalledWith(expectedRoom);

    expect(result).toEqual(expectedRoom);
  });

  test("delete debe llamar al repositorio con el ID correcto", async () => {
    const expectedId = "1";

    vi.mocked(mockRoomRepository.delete).mockResolvedValue(undefined);
    await roomUsesCases.delete(expectedId);

    expect(mockRoomRepository.delete).toHaveBeenCalledTimes(1);

    expect(mockRoomRepository.delete).toHaveBeenCalledWith(expectedId);
  });

  test("findUniqueRoomsByType debe retornar un listado con las habitaciones encontradas", async () => {
    vi.mocked(mockRoomRepository.findUniqueRoomsByType).mockResolvedValue([
      expectedRoom,
    ]);

    const result = await roomUsesCases.findUniqueRoomsByType();

    expect(mockRoomRepository.findUniqueRoomsByType).toHaveBeenCalledTimes(1);
    expect(mockRoomRepository.findUniqueRoomsByType).toHaveBeenCalledWith();

    expect(result).toEqual([expectedRoom]);
  });
});
