import type { FastifyReply, FastifyRequest } from "fastify";
import { describe, expect, it, vitest } from "vitest";
import type { Room } from "../model";
import { CreateRoomUseCase } from "./create-room";

describe("Rooms", () => {
  it("should create a room", async () => {
    const createRoom = new CreateRoomUseCase();

    const room: Room = {
      name: "Test room",
      descriptions: "This is a test room",
    };

    expect(await createRoom.execute()).toMatchObject(room);
  });
});
