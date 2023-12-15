import express, { Request, Router, Response } from "express";
import {
  resetPasswordRequestController,
  resetPasswordController,
} from "../controllers/authController";

const requestPasswordRouter: Router = express.Router();
const resetPasswordRouter: Router = express.Router();

requestPasswordRouter.post("/", async (req: Request, res: Response) => {
  try {
    const response = await resetPasswordRequestController(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: "An error occurred." });
  }
});

resetPasswordRouter.post("/", async (req: Request, res: Response) => {
  try {
    const response = await resetPasswordController(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: "An error occurred." });
  }
});

export { requestPasswordRouter, resetPasswordRouter };
