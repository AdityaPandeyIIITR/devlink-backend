jest.setTimeout(30000);

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

let token = "";

beforeAll(async () => {
    const email = `testuser+${Date.now()}@example.com`.trim;

  // Register user
  await request(app)
    .post("/api/auth/signup")
    .set("Content-Type", "application/json")
    .send({
      name: "Test User",
      email: "testuser@example.com".trim().toLowerCase(),
      password: "password123"
    });

  // Login user
  const res = await request(app)
    .post("/api/auth/login")
    .set("Content-Type", "application/json")
    .send({
      email: "testuser@example.com".trim().toLowerCase(),
      password: "password123"
    });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Link Shortening", () => {
  it("should create a short link for an authenticated user", async () => {
    const res = await request(app)
      .post("/api/links/shorten")
      .set("Authorization", `Bearer ${token}`)
      .send({
        originalUrl: "https://example.com/some/long/url"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("shortUrl");
    expect(res.body).toHaveProperty("originalUrl", "https://example.com/some/long/url");
  });

  it("should reject unauthenticated requests", async () => {
    const res = await request(app)
      .post("/api/links/shorten")
      .send({ originalUrl: "https://unauth.com" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "No token provided");
  });
});


//Closing MongoDB explicitly
afterAll(async () => {
  await mongoose.connection.close();
});