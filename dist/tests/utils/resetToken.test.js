"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resetToken_1 = require("../../utils/resetToken");
const Tokens_1 = __importDefault(require("../../models/Tokens"));
const db_1 = require("../../config/db");
describe("generateRandomToken", () => {
    it("should generate a random token of the specified length", () => {
        const length = 16;
        const token = (0, resetToken_1.generateRandomToken)(length);
        expect(token.length).toBe(length);
        const validCharacters = /^[A-Za-z0-9]+$/;
        expect(token).toMatch(validCharacters);
    });
    it("should generate a default token of length 32 if no length is specified", () => {
        const defaultToken = (0, resetToken_1.generateRandomToken)();
        expect(defaultToken.length).toBe(32);
    });
});
describe("generateResetToken", () => {
    it("should generate a reset token with the correct properties", async () => {
        const userEmail = "test@example.com";
        const token = await (0, resetToken_1.generateResetToken)(userEmail);
        expect(token).toBeInstanceOf(Tokens_1.default);
        expect(token.userEmail).toBe(userEmail);
        const tokenLength = token.token.length;
        expect(tokenLength).toBe(32);
    });
});
afterAll(async () => {
    await db_1.sq.close();
});
//# sourceMappingURL=resetToken.test.js.map