import type { FastifyInstance } from "fastify";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { beforeAll, describe, expect, it } from "vitest";
import { createServer } from "../../src/server";

describe("E2E: Room", () => {
  let mongoServer: MongoMemoryServer;
  let app: FastifyInstance;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    app = createServer();
    await app.ready();
  });

  it("should create a room", async () => {
    const response = await app.inject().post("/rooms").body({
      name: "Test room",
      description: "This is a test room",
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({
      id: expect.any(String),
      name: "Test room",
      description: "This is a test room",
      code: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
