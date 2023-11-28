import dotenv from "dotenv";
import express, { Express, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import signUpRouter from "./routers/signupRouter";
import loginRouter from "./routers/loginRouter";
import {
  resetPasswordRouter,
  requestPasswordRouter,
} from "./routers/requestPasswordRouter";
import { connectDB } from "./config/db";
import User from "./models/Users";

dotenv.config();

const app: Express = express();

connectDB();
User.initialize();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (res: Response) => {
  res.send("Hello World From the Typescript Server!");
});

app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/requestResetPassword", requestPasswordRouter);
app.use("/resetPassword", resetPasswordRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
