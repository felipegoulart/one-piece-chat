import fastify, { type FastifyInstance } from "fastify";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { RoomController } from "../../src/modules/rooms/controller";
import { RoomService } from "../../src/modules/rooms/service";
import { roomInput, roomOutput } from "../fixtures/rooms";

describe("Functional: Room", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();

    const roomRepository = {
      insert: vi.fn(),
      findOne: vi.fn(),
      findMany: vi.fn(),
    };

    roomRepository.insert.mockResolvedValue(roomOutput);

    const roomService = new RoomService(roomRepository);
    const roomController = new RoomController(roomService);

    app.register(
      (appInstance) => {
        appInstance.route({
          method: "POST",
          url: "/",
          handler: roomController.createRoom.bind(roomController),
        });

        appInstance.route({
          method: "GET",
          url: "/:code",
          handler: roomController.getRoomByCode.bind(roomController),
        });
      },
      {
        prefix: "/rooms",
      },
    );

    await app.ready();
  });

  it("should create a room", async () => {
    const response = await app.inject().post("/rooms").body(roomInput);

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual(expect.objectContaining(roomInput));
  });

  it("should return room by Id", async () => {
    const response = await app.inject().get("/rooms/1asd");

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(roomInput);
  });
});
