import "dotenv/config";

import { Sequelize } from "sequelize-typescript";
const env = process.env.NODE_ENV || "development";
import { development, production } from "./config";

export const sq = new Sequelize(
  env === "production" ? production : development
);

export const connectDB = async () => {
  try {
    await sq.authenticate();
  } catch (error) {
    console.error("Unable to connect", error);
  }
};
