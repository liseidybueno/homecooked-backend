"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sq = void 0;
require("dotenv/config");
const sequelize_typescript_1 = require("sequelize-typescript");
const env = process.env.NODE_ENV || "development";
const config_1 = require("./config");
exports.sq = new sequelize_typescript_1.Sequelize(env === "production" ? config_1.production : config_1.development);
const connectDB = async () => {
    try {
        await exports.sq.authenticate();
        console.log("**Connection has been established");
    }
    catch (error) {
        console.error("Unable to connect", error);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map