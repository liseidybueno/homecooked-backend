"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
exports.Users = db_1.sq.define("users", {
    uuid: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: (0, sequelize_1.literal)("gen_random_uuid()"),
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdRecipes: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON),
    },
    savedRecipes: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON),
    },
});
exports.Users.sync().then(() => {
    console.log("User Model Synced");
});
//# sourceMappingURL=Users.js.map