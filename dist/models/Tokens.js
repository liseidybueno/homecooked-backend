"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
class Token extends sequelize_1.Model {
}
Token.init({
    uuid: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    userEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: db_1.sq,
    modelName: "Token",
    tableName: "tokens",
    timestamps: true,
});
if (process.env.NODE_ENV !== "test") {
    Token.sync()
        .then(() => {
        console.log("Token database synced.");
    })
        .catch((error) => {
        console.error("Error syncing Token model:", error);
    });
}
exports.default = Token;
//# sourceMappingURL=Tokens.js.map