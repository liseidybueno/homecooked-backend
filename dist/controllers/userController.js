"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("../models/Users");
async function createUser(user) {
    const email = user.email;
    try {
        const getUser = await Users_1.Users.findOne({
            where: {
                email: email,
            },
        });
        if (getUser) {
            return true;
        }
        else {
            await Users_1.Users.create({
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
async function getUser(email, password) {
    try {
        const user = await Users_1.Users.findOne({
            where: {
                email: email,
            },
        });
        if (user) {
            console.log("****correct user");
            if (password === user.dataValues.password) {
                console.log("***correct password");
                return {
                    canLogin: true,
                    user: user,
                };
            }
            else {
                return {
                    canLogin: false,
                    errorMsg: 'Password was incorrect, please try again or click "Forgot Password"',
                };
            }
        }
        else {
            return {
                canLogin: false,
                errorMsg: "This user does not exist. Please sign up or try another email address.",
            };
        }
        return getUser;
    }
    catch (error) {
        console.error("Unable to connect", error);
        return false;
    }
}
exports.default = { createUser, getUser };
//# sourceMappingURL=userController.js.map