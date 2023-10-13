require("dotenv").config();
import { Dialect } from "sequelize/types";

// config.ts
export interface DbConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  dialect: Dialect;
}

export const development: DbConfig = {
  database: process.env.DB_NAME!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST!,
  dialect: (process.env.DB_DIALECT as Dialect) || "postgres",
};

export const production: DbConfig = {
  database: process.env.PROD_DB_NAME || "production_database",
  username: process.env.PROD_DB_USER || "production_user",
  password: process.env.PROD_DB_PASSWORD || "production_password",
  host: process.env.PROD_DB_HOST || "localhost",
  dialect: (process.env.PROD_DB_DIALECT as Dialect) || "postgres",
};
