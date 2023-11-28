import express, { Request, Router, Response } from "express";
import {
  resetPasswordRequestController,
  resetPasswordController,
} from "../controllers/authController";

const requestPasswordRouter: Router = express.Router();
const resetPasswordRouter: Router = express.Router();

requestPasswordRouter.post("/", async (req: Request, res: Response) => {
  try {
    await resetPasswordRequestController(req, res);
  } catch (error) {
    console.log("Reset Password Request Controller Error", error);
  }
});

resetPasswordRouter.post("/", async (req: Request, res: Response) => {
  try {
    await resetPasswordController(req, res);
  } catch (error) {
    console.log("Reset Pasword Controller Error", error);
  }
});

export { requestPasswordRouter, resetPasswordRouter };
