jest.setTimeout(30000);

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const Link = require("../models/Link");
const Click = require("../models/Click");

let token;
let shortId;

beforeAll(async () => {
  // Ensure DB is connected
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // Clean up previous data
  await Promise.all([
    User.deleteMany({ email: "analytics@example.com" }),
    Link.deleteMany({}),
    Click.deleteMany({})
  ]);

  // Register test user
  const registerRes = await request(app)
    .post("/api/auth/signup")
    .send({
      name: "Analytics User",
      email: "analytics@example.com",
      password: "password123",
    });

  if (![200, 201].includes(registerRes.statusCode)) {
    console.error("Registration failed:", registerRes.statusCode, registerRes.body);
  }

  // Login user
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      email: "analytics@example.com",
      password: "password123",
    });

  if (![200, 201].includes(loginRes.statusCode)) {
    console.error("Login failed:", loginRes.statusCode, loginRes.body);
    throw new Error("Login failed, cannot get token");
  }

  token = loginRes.body.token;

  // Create a short link
  const linkRes = await request(app)
    .post("/api/links/shorten")
    .set("Authorization", `Bearer ${token}`)
    .send({ originalUrl: "https://example.com/analytics-test" });

  console.log("Link shorten response status:", linkRes.statusCode);
  console.log("Link shorten response body:", linkRes.body);

  if (!linkRes.body.shortUrl) {
    throw new Error("shortUrl not found in link shorten response");
  }

  shortId = linkRes.body.shortUrl.split("/").pop();

  // Find the link in DB and insert click records
  const link = await Link.findOne({ shortId });
  if (!link) throw new Error("Link not found in DB");

  await Click.create([
    { linkId: link._id, ip: "1.1.1.1", userAgent: "Chrome", referrer: "https://ref.com" },
    { linkId: link._id, ip: "2.2.2.2", userAgent: "Firefox", referrer: "https://ref2.com" },
  ]);
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await Promise.all([
      User.deleteMany({ email: "analytics@example.com" }),
      Link.deleteMany({}),
      Click.deleteMany({})
    ]);
    await mongoose.connection.close();
  }
});

describe("Analytics Route", () => {
  it("should return click analytics for the link", async () => {
    const res = await request(app)
      .get(`/api/analytics/${shortId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalClicks", 2);
    expect(res.body.clicks).toHaveLength(2);
    expect(res.body.clicks[0]).toHaveProperty("ip");
    expect(res.body.clicks[0]).toHaveProperty("referrer");
    expect(res.body.clicks[0]).toHaveProperty("timestamp");
    expect(res.body.clicks[0]).toHaveProperty("userAgent");
  });
});
