import type { InputCreateRoomDTO, OutputCreateRoomDTO } from "@repo/core-entities/rooms/dto.js";

export interface RoomRepository {
  insert(payload: InputCreateRoomDTO): Promise<OutputCreateRoomDTO>;
  findOne(id: string): Promise<OutputCreateRoomDTO>;
  findMany(): Promise<OutputCreateRoomDTO[]>;
}
