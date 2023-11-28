import request from "supertest";
import express from "express";
import userController from "../../controllers/userController";

jest.mock("../../controllers/userController"); // Mock userController

describe("Sign up router", () => {
  const app = express();
  app.use(express.json());

  const signupRouter = require("../../routers/signupRouter").default;

  app.use("/signup", signupRouter);

  it("successfully sign up a user if doesn`t exist", async () => {
    const userInfo = {
      firstName: "Test",
      lastName: "Name",
      email: "test@email.com",
      password: "testPassword",
    };

    (userController.createUser as jest.Mock).mockResolvedValueOnce(false);

    const response = await request(app).post("/signup").send(userInfo);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ userExists: false });
  });

  it("successfully returns true if user already exists", async () => {
    const userInfo = {
      firstName: "Test",
      lastName: "Name",
      email: "test@email.com",
      password: "testPassword",
    };

    (userController.createUser as jest.Mock).mockResolvedValueOnce(true);

    const response = await request(app).post("/signup").send(userInfo);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ userExists: true });
  });
});
