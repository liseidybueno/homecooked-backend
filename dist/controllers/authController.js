"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordRequestController = exports.resetPasswordController = void 0;
const authService_1 = __importDefault(require("../services/authService"));
const resetPasswordRequestController = async (req, res) => {
    console.log("****inside reset");
    console.log("****req", req.body);
    const requestPasswordResetService = await authService_1.default.requestPasswordReset(req.body.email);
    return res.json(requestPasswordResetService);
};
exports.resetPasswordRequestController = resetPasswordRequestController;
const resetPasswordController = async (req, res) => {
    console.log("******inside reset password controller");
    console.log("****Req", req.body);
    const resetPasswordService = await authService_1.default.resetPassword(req.body.email, req.body.token, req.body.password);
    return res.json(resetPasswordService);
};
exports.resetPasswordController = resetPasswordController;
//# sourceMappingURL=authController.js.map