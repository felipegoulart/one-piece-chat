import z from "zod/v4";
import { UserSchema } from "./entity";

export const InputCreateUserDTO = z.object({
  nickname: z.string().min(3).max(20),
  email: z.email(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type InputCreateUserDTO = z.infer<typeof InputCreateUserDTO>;

export const OutputCreateRoomDTO = UserSchema.omit({ password: true });

export type OutputCreateRoomDTO = z.infer<typeof OutputCreateRoomDTO>;
