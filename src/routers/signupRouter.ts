import express, { Router, Request, Response } from "express";
import userController from "../controllers/userController";

const signUpRouter: Router = express.Router();

//API route: /signup
signUpRouter.post("/", async (req: Request, res: Response) => {
  const user = req.body.user;

  const userAdded = await userController.createUser(user);

  res.status(200).send({ userExists: userAdded });
});

export default signUpRouter;
