import type { InputCreateRoomDTO } from "@repo/core-entities/rooms/dto.js";
import { describe, expect, it, vitest } from "vitest";
import type { RoomRepository } from "./repositories/repository";
import { RoomService } from "./service";

describe("Rooms", () => {
  it("should create a room", async () => {
    const repository = {
      insert: vitest.fn(),
      findOne: vitest.fn(),
      findMany: vitest.fn(),
    };

    repository.insert.mockResolvedValue({
      id: "1",
      name: "Test room",
      code: "TEST",
      description: "This is a test room",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const service = new RoomService(repository);

    const room: InputCreateRoomDTO = {
      name: "Test room",
      code: "TEST",
      description: "This is a test room",
    };

    expect(await service.createRoom(room)).toMatchObject(expect.objectContaining(room));
    expect(repository.insert).toHaveBeenCalledTimes(1);
  });
});
