import type { FastifyInstance } from "fastify";
import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateBodySchema, CreateResponseSchema, RoomController } from "./controller";
import { RoomMongoRepository } from "./repositories/mongo-repository";
import { RoomService } from "./service";

export const roomRoutes: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  const repository = new RoomMongoRepository();
  const service = new RoomService(repository);
  const controller = new RoomController(service);

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/",
    schema: {
      body: CreateBodySchema,
      response: {
        201: CreateResponseSchema,
      },
    },
    handler: controller.createRoom.bind(controller),
  });
};
