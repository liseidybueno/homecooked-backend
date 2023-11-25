import express, { Request, Router, Response } from "express";
import {
  resetPasswordRequestController,
  resetPasswordController,
} from "../controllers/authController";
// import { resetPasswordRequestController } from "../controllers/authController";

const requestPasswordRouter: Router = express.Router();
const resetPasswordRouter: Router = express.Router();

// const router = require("express").Router();

// router.post("/auth/requestResetPassword", resetPasswordRequestController);

requestPasswordRouter.post("/", async (req: Request, res: Response) => {
  try {
    await resetPasswordRequestController(req, res);
  } catch (error) {
    console.log("****there was an error");
  }
});

resetPasswordRouter.post("/", async (req: Request, res: Response) => {
  console.log("****reset password router");
  try {
    const didResetPassword = await resetPasswordController(req, res);
    console.log("***didreset", didResetPassword.req.body);
    // return didResetPassword.json();
  } catch (error) {
    console.log("****error");
  }
});

export { requestPasswordRouter, resetPasswordRouter };

// export default requestPasswordRouter.post(
//   "/",
//   async (req: Request, res: Response) => {
//     console.log("****request password router", req);
//     res.status(200).send(resetPasswordRequestController);
//   }
// );
// router.post("/auth/resetPassword", resetPasswordController);
