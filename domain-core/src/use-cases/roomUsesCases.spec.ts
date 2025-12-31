import { describe, test, expect, vi, Mock, afterEach } from "vitest";
import { Room } from "../entities/Room";
import { RoomType } from "../enums";
import { RoomUsesCases } from "./roomUsesCases";
import { RoomRepository } from "../repository";
import { NotFoundError } from "../errors";

const mockRoomRepository: RoomRepository = {
  getAll: vi.fn(),
  getById: vi.fn(),
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
    vi.mocked(mockRoomRepository).save.mockResolvedValue(void 0);

    const result = await roomUsesCases.save(expectedRoom);

    expect(mockRoomRepository.save).toHaveBeenCalledTimes(1);
    expect(mockRoomRepository.save).toHaveBeenCalledWith(expectedRoom);

    expect(result).toEqual(undefined);
  });

  test("si el metodo delete no encuentra la room devuelve un throw", async () => {
    const expectedId = "1";

    expect(roomUsesCases.delete(expectedId)).rejects.toThrow(NotFoundError)
  });

});
