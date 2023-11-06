import express, { Router, Request, Response } from "express";
import userController from "../controllers/userController";

const loginRouter: Router = express.Router();

//API route: /login
loginRouter.post("/", async (req: Request, res: Response) => {
  const user = req.body.user;

  const loginResponse = await userController.getUser(user.email);

  res.status(200).send({ loginResponse });
});

export default loginRouter;
