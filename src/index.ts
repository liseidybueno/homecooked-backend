import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";
import { Users } from "./models/Users";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (res: Response) => {
  res.send("Hello World From the Typescript Server!");
});

app.post("/signup", async (req: Request, res: Response) => {
  const user = req.body.user;
  const email = user.email;

  try {
    // await sq.authenticate();
    await connectDB();
    console.log("Connection has been established");

    const getUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (getUser) {
      res
        .status(200)
        .json({ userExists: true, message: "This user already exists!" });
    } else {
      await Users.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
      res.status(200).json({ userExists: false, user });
    }
  } catch (error) {
    console.error("Unable to connect", error);
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
