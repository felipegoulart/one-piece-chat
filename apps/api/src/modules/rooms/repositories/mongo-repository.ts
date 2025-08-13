import type { InputCreateRoomDTO, OutputCreateRoomDTO } from "@repo/core-entities/rooms/dto.js";
import { roomMongoSchema } from "@repo/core-entities/rooms/index.js";
import { model } from "mongoose";
import type { RoomRepository } from "./repository";

export class RoomMongoRepository implements RoomRepository {
  constructor(private readonly room = model("room", roomMongoSchema)) {}

  async insert(payload: InputCreateRoomDTO): Promise<OutputCreateRoomDTO> {
    const result = await this.room.create({
      name: payload.name,
      description: payload.description,
      code: payload.code,
    });

    const room = result.toJSON();

    return {
      id: room._id.toString(),
      code: room.code,
      createdAt: room.createdAt,
      name: room.name,
      description: room.description,
      updatedAt: room.updatedAt,
      users: room.users,
    };
  }

  findOne(id: string): Promise<OutputCreateRoomDTO> {
    throw new Error("Method not implemented.");
  }

  findMany(): Promise<OutputCreateRoomDTO[]> {
    throw new Error("Method not implemented.");
  }
}
