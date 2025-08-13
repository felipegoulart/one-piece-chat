import cors from "@fastify/cors";
import fastify, { type FastifyInstance } from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod/v4";
import { roomRoutes } from "./modules/rooms";

export const createServer = (): FastifyInstance => {
  const app = fastify({
    logger: process.env.NODE_ENV !== "test" ? { level: "debug" } : false,
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

  app.register(roomRoutes, { prefix: "/rooms" });

  app.setErrorHandler((error, request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.code(400).send({
        error: "Response Validation Error",
        message: "Request doesn't match the schema",
        statusCode: 400,
        details: {
          issues: error.validation,
          method: request.method,
          url: request.url,
        },
      });
    }

    if (isResponseSerializationError(error)) {
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Response doesn't match the schema",
        statusCode: 500,
        details: {
          issues: error.cause.issues,
          method: error.method,
          url: error.url,
        },
      });
    }
    request.log.error(error);
    reply.status(500).send({ error: "Internal server error" });
  });

  return app;
};
