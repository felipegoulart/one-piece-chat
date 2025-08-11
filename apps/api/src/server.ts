import cors from "@fastify/cors";
import fastify, { type FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod/v4";

export const createServer = (): FastifyInstance => {
  const app = fastify({
    logger: true,
  });
  app.register(cors);

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      schema: {
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async () => {
      return {
        message: "hello world",
      };
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/health",
    {
      schema: {
        response: {
          200: z.object({
            status: z.string(),
          }),
        },
      },
    },
    async () => {
      return {
        status: "ok",
      };
    },
  );

  return app;
};
