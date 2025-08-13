import type { InputCreateRoomDTO, OutputCreateRoomDTO } from "@repo/core-entities/rooms/dto.js";
import type { RoomRepository } from "./repositories/repository";

export class RoomService {
  constructor(private readonly repository: RoomRepository) {}

  async createRoom(payload: Omit<InputCreateRoomDTO, "code">): Promise<OutputCreateRoomDTO> {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const room = await this.repository.insert({
      ...payload,
      code,
    });

    return room;
  }
}
