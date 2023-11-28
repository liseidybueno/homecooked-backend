import request from "supertest";
import express from "express";
import userController from "../../controllers/userController";

jest.mock("../../controllers/userController"); // Mock userController

describe("Login Router", () => {
  const app = express();
  app.use(express.json());

  const loginRouter = require("../../routers/loginRouter").default;

  app.use("/login", loginRouter);

  it("should respond with correct email and password", async () => {
    // Mock data for testing
    const mockUser = {
      email: "test@example.com",
      password: "password123",
    };

    // Mock userController.getEmail to return true
    (userController.getEmail as jest.Mock).mockResolvedValueOnce(true);

    // Mock userController.checkPassword to return true
    (userController.checkPassword as jest.Mock).mockResolvedValueOnce(true);

    // Make a request to the /login endpoint
    const response = await request(app)
      .post("/login")
      .send({ user: mockUser })
      .expect(200);

    // Assertions
    expect(response.body).toEqual({
      isCorrectEmail: true,
      isCorrectPassword: true,
    });
  });

  it("should respond with correct email and incorrect password", async () => {
    // Mock data for testing
    const mockUser = {
      email: "test@example.com",
      password: "incorrectPassword",
    };

    // Mock userController.getEmail to return true
    (userController.getEmail as jest.Mock).mockResolvedValueOnce(true);

    // Mock userController.checkPassword to return false
    (userController.checkPassword as jest.Mock).mockResolvedValueOnce(false);

    // Make a request to the /login endpoint
    const response = await request(app)
      .post("/login")
      .send({ user: mockUser })
      .expect(200);

    // Assertions
    expect(response.body).toEqual({
      isCorrectEmail: true,
      isCorrectPassword: false,
    });
  });

  it("should respond with incorrect email", async () => {
    // Mock data for testing
    const mockUser = {
      email: "nonexistent@example.com",
      password: "password123",
    };

    // Mock userController.getEmail to return false
    (userController.getEmail as jest.Mock).mockResolvedValueOnce(false);

    // Make a request to the /login endpoint
    const response = await request(app)
      .post("/login")
      .send({ user: mockUser })
      .expect(200);

    // Assertions
    expect(response.body).toEqual({
      isCorrectEmail: false,
    });
  });
});
