import request from "supertest";
import express from "express";
import {
  resetPasswordRouter,
  requestPasswordRouter,
} from "../../routers/requestPasswordRouter";
import * as authController from "../../controllers/authController";

jest.mock("../../controllers/authController");

describe("Request password router", () => {
  const app = express();
  app.use(express.json());

  app.use("/requestResetPassword", requestPasswordRouter);

  it("should response with correct URL", async () => {
    const email = "test@email.com";
    const mockedURL =
      "http://clienturl.com/resetPassword?token=mockToen&id=test@email.com";

    (
      authController.resetPasswordRequestController as jest.Mock
    ).mockResolvedValueOnce(mockedURL);

    const response = await request(app)
      .post("/requestResetPassword")
      .send(email)
      .expect(200);

    expect(response.body).toEqual(mockedURL);
  });

  it("should respond with an error", async () => {
    const email = "test@email.com";

    (
      authController.resetPasswordRequestController as jest.Mock
    ).mockRejectedValueOnce(new Error("Test error"));

    const response = await request(app)
      .post("/requestResetPassword")
      .send(email);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "An error occurred." });
  });
});

describe("Reset password router", () => {
  const app = express();
  app.use(express.json());

  app.use("/resetPassword", resetPasswordRouter);

  it("should response true", async () => {
    (authController.resetPasswordController as jest.Mock).mockResolvedValueOnce(
      true
    );

    const response = await request(app)
      .post("/resetPassword")
      .send({
        email: "test@email.com",
        toke: "mockToken",
        password: "mockPassword",
      })
      .expect(200);

    expect(response.body).toBe(true);
  });

  it("should respond with an error", async () => {
    (authController.resetPasswordController as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );

    const response = await request(app).post("/resetPassword").send({
      email: "test@email.com",
      toke: "mockToken",
      password: "mockPassword",
    });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "An error occurred." });
  });
});
