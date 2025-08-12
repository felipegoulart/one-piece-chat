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
          200: z.literal("hello world"),
        },
      },
    },
    () => {
      return "hello world" as const;
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/status",
    {
      schema: {
        response: {
          200: z.literal("ok"),
        },
      },
    },
    () => {
      return "ok" as const;
    },
  );

  return app;
};
