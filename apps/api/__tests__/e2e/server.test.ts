import type { FastifyInstance } from "fastify";
import supertest from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { createServer } from "../../src/server";

describe("E2E: server", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = createServer();
    await app.ready();
  });

  it("status check returns 200", async () => {
    const response = await app.inject().get("/status");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("ok");
  });

  it("message endpoint says hello", async () => {
    const response = await app.inject().get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("hello world");
  });
});
