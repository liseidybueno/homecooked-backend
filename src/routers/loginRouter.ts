import express, { Router, Request, Response } from "express";
import userController from "../controllers/userController";

const loginRouter: Router = express.Router();

//API route: /login
loginRouter.post("/", async (req: Request, res: Response) => {
  const user = req.body.user;

  const doesEmailExist = await userController.getEmail(user.email);

  if (doesEmailExist) {
    const isCorrectPassword = await userController.checkPassword(
      user.email,
      user.password
    );

    if (isCorrectPassword) {
      res.status(200).send({
        isCorrectEmail: true,
        isCorrectPassword: true,
      });
    } else {
      res.status(200).send({
        isCorrectEmail: true,
        isCorrectPassword: false,
      });
    }
  } else {
    res.status(200).send({
      isCorrectEmail: false,
    });
  }
});

export default loginRouter;
