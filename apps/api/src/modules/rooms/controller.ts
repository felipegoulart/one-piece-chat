import type { FastifyReply, FastifyRequest } from "fastify";
import type { RoomService } from "./service";
import { InputCreateRoomSchema, OutputCreateRoomSchema } from "@repo/core-entities/rooms/dto.js";
import z from "zod/v4";

export const CreateBodySchema = InputCreateRoomSchema.omit({ code: true })
type CreateBody = z.infer<typeof CreateBodySchema>;

export const CreateResponseSchema = OutputCreateRoomSchema.omit({ deletedAt: true, users: true })


export class RoomController {
  constructor(private readonly service: RoomService) {}

  async createRoom(request: FastifyRequest<{
    Body: CreateBody;
  }>, reply: FastifyReply) {
    request.log.info("Creating room");
    const { name, description } = request.body;
    try {
      const response = await this.service.createRoom({ name, description });
  
      return reply.status(201).send({
        id: response.id,
        name: response.name,
        description: response.description,
        code: response.code,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      })
    } catch (error) {
      request.log.error(error);
      console.error(error)
      return reply.status(500).send({ error: "Internal server error" });
    }
  }

  async getRoomByCode(request: FastifyRequest<{ Params: { code: string } }>, reply: FastifyReply) {
    request.log.info(`Getting room by code: ${request.params.code}`);

    return {
      name: "Test room",
      description: "This is a test room",
      code: "TEST",
    };
  }
}
