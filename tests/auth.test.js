const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");

jest.setTimeout(30000);
const reusedEmail = "duplicate-check@example.com".trim().toLowerCase();

describe("Auth Routes", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test User",
        email: reusedEmail,
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User created successfully");
  });

  it("should not allow duplicate registration", async () => {
    // First create user
    await new User({
      name: "Test User",
      email: reusedEmail,
      password: "password123"
    }).save();

    // Then try registering again
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test User",
        email: reusedEmail,
        password: "password123"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
