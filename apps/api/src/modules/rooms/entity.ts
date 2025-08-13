import z from "zod/v4";

const roomSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  descriptions: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type RoomType = z.infer<typeof roomSchema>;

const inputSchema = roomSchema.pick({
  name: true,
  descriptions: true,
});

export type RoomInputDTO = z.infer<typeof inputSchema>;

export class Room {
  public id?: string;
  public name: string;
  public descriptions?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  private constructor(props: Partial<RoomType>) {
    const { id, name, descriptions, createdAt, updatedAt, deletedAt } = roomSchema
      .partial({ createdAt: true, updatedAt: true, deletedAt: true, id: true })
      .parse(props);

    this.id = id;
    this.name = name;
    this.descriptions = descriptions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static create(props: RoomInputDTO) {
    const { name, descriptions } = inputSchema.parse(props);
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()

    return new Room(props);
  }

  static fromPersistence(props: RoomType) {
    return new Room(props);
  }  
}
