import type z from "zod/v4";
import { RoomSchema } from "./entity.js";

export const InputCreateRoomSchema = RoomSchema.pick({
  name: true,
  description: true,
  code: true,
});

export type InputCreateRoomDTO = z.infer<typeof InputCreateRoomSchema>;

export const OutputCreateRoomSchema = RoomSchema.clone();

export type OutputCreateRoomDTO = z.infer<typeof OutputCreateRoomSchema>;
