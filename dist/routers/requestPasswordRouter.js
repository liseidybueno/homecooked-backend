"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordRouter = exports.requestPasswordRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const requestPasswordRouter = express_1.default.Router();
exports.requestPasswordRouter = requestPasswordRouter;
const resetPasswordRouter = express_1.default.Router();
exports.resetPasswordRouter = resetPasswordRouter;
requestPasswordRouter.post("/", async (req, res) => {
    try {
        await (0, authController_1.resetPasswordRequestController)(req, res);
    }
    catch (error) {
        console.log("****there was an error");
    }
});
resetPasswordRouter.post("/", async (req, res) => {
    console.log("****reset password router");
    try {
        const didResetPassword = await (0, authController_1.resetPasswordController)(req, res);
        console.log("***didreset", didResetPassword.req.body);
    }
    catch (error) {
        console.log("****error");
    }
});
//# sourceMappingURL=requestPasswordRouter.js.map