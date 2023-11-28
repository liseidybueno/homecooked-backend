"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    static initialize() {
        User.init({
            uuid: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
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
        }, {
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = bcrypt_1.default.genSaltSync(10, "a");
                        user.password = bcrypt_1.default.hashSync(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password) {
                        const salt = bcrypt_1.default.genSaltSync(10, "a");
                        user.password = bcrypt_1.default.hashSync(user.password, salt);
                    }
                },
            },
            sequelize: db_1.sq,
            modelName: "User",
            tableName: "users",
        });
        if (process.env.NODE_ENV !== "test") {
            User.sync()
                .then(() => {
                console.log("User database synced.");
            })
                .catch((error) => {
                console.error("Error syncing User model:", error);
            });
        }
    }
    validPassword(password) {
        return bcrypt_1.default.compareSync(password, this.password);
    }
}
exports.default = User;
//# sourceMappingURL=Users.js.map