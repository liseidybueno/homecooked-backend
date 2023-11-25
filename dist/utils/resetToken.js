"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetToken = exports.generateRandomToken = void 0;
const Tokens_1 = __importDefault(require("../models/Tokens"));
const generateRandomToken = (length = 32) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
};
exports.generateRandomToken = generateRandomToken;
const generateResetToken = async (userEmail) => {
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 1);
    const token = await Tokens_1.default.create({
        userEmail,
        token: (0, exports.generateRandomToken)(),
        expiry: expiryTime,
    });
    return token;
};
exports.generateResetToken = generateResetToken;
//# sourceMappingURL=resetToken.js.map