const mongoose = require("mongoose");
const { User } = require("../../models/user");
const request = require("supertest");

let server;

describe("/api/users", () => {
  const user_obj = {
    fullName: "John Doe",
    email: "test@test.com",
    password: "test",
  };
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();
    await User.deleteMany({});
  });

  describe("GET /:id", () => {
    it("should return a user if id is valid", async () => {
      const user = new User(user_obj);

      await user.save();

      const res = request(server).get("/api/users" + user._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("fullName", user.fullName);
      expect(res.body).toHaveProperty("email", user.email);
    });
  });

  describe("POST /", () => {
    it("should return a user if valid", async () => {
      const res = await request(server).post("/api/users").send(user_obj);

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("fullName", user.fullName);
      expect(res.body).toHaveProperty("email", user.email);
    });
  });
});
