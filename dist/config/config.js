"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.production = exports.development = void 0;
require("dotenv").config();
exports.development = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
};
exports.production = {
    database: process.env.PROD_DB_NAME || "production_database",
    username: process.env.PROD_DB_USER || "production_user",
    password: process.env.PROD_DB_PASSWORD || "production_password",
    host: process.env.PROD_DB_HOST || "localhost",
    dialect: process.env.PROD_DB_DIALECT || "postgres",
};
//# sourceMappingURL=config.js.map