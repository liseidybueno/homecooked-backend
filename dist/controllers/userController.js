"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
async function createUser(user) {
    const email = user.email;
    try {
        const getUser = await Users_1.default.findOne({
            where: {
                email: email,
            },
        });
        if (getUser) {
            return true;
        }
        else {
            await Users_1.default.create({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            });
            return false;
        }
    }
    catch (error) {
        console.error("Unable to connect", error);
        return false;
    }
}
async function getEmail(email) {
    try {
        const user = await Users_1.default.findOne({
            where: {
                email: email,
            },
        });
        if (user) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error("Error retrieving user", error);
        return false;
    }
}
async function checkPassword(email, password) {
    try {
        const user = await Users_1.default.findOne({
            where: {
                email,
            },
        });
        if (user) {
            return bcrypt_1.default.compareSync(password, user.password);
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error("Error retrieving user", error);
        return false;
    }
}
async function getUser(email) {
    try {
        const user = await Users_1.default.findOne({
            where: {
                email,
            },
        });
        if (user) {
            return {
                canLogin: true,
                user,
            };
        }
        else {
            return {
                canLogin: false,
                errorMsg: "This user does not exist. Please sign up or try another email address.",
            };
        }
    }
    catch (error) {
        console.error("Error retrieving user", error);
        return {
            canLogin: false,
            errorMsg: "An error occurred while retrieving the user.",
        };
    }
}
exports.default = { createUser, getUser, getEmail, checkPassword };
//# sourceMappingURL=userController.js.map