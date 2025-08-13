import type { InputCreateRoomDTO, OutputCreateRoomDTO } from "@repo/core-entities/rooms/dto.js";

export const roomInput: InputCreateRoomDTO = {
  name: "Test room",
  description: "This is a test room",
  code: "TEST",
};

export const roomOutput: OutputCreateRoomDTO = {
  name: "Test room",
  description: "This is a test room",
  code: "TEST",
  id: "123",
  createdAt: new Date(),
  updatedAt: new Date(),
  users: [],
};
