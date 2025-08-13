import z from "zod/v4";

export const UserSchema = z.object({
  id: z.string(),
  nickname: z.string().min(3).max(20),
  email: z.email(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
