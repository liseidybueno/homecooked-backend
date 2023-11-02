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
exports.default = { createUser };
//# sourceMappingURL=userController.js.map