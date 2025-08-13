import z from "zod/v4";

export const RoomSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(20),
  description: z.string().max(128).optional(),
  code: z.string().length(6),
  users: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type Room = z.infer<typeof RoomSchema>;
