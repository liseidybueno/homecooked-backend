"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../../services/authService"));
const Tokens_1 = __importDefault(require("../../models/Tokens"));
const Users_1 = __importDefault(require("../../models/Users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
jest.mock("../../models/Tokens");
jest.mock("../../models/Users");
jest.mock("../../utils/emails/sendEmail");
describe("resetPassword", () => {
    it("should reset the password successfully", async () => {
        const email = "test@example.com";
        const token = "mockedToken";
        const password = "newPassword";
        Tokens_1.default.findOne = jest.fn().mockResolvedValueOnce({
            userEmail: email,
            token: await bcrypt_1.default.hash(token, 10),
            destroy: jest.fn(),
        });
        Users_1.default.findOne = jest.fn().mockResolvedValueOnce({
            email,
            firstName: "Test",
            lastName: "User",
            password: "oldPassword",
            save: jest.fn(),
        });
        const result = await authService_1.default.resetPassword(email, token, password);
        expect(result).toBe(true);
    });
    it("should throw an error for invalid or expired token", async () => {
        const email = "test@example.com";
        const token = "invalidToken";
        const password = "newPassword";
        Tokens_1.default.findOne = jest.fn().mockResolvedValueOnce(null);
        bcrypt_1.default.compare = jest.fn().mockResolvedValueOnce(false);
        await expect(authService_1.default.resetPassword(email, token, password)).rejects.toThrow("Invalid or expired password reset token.");
        expect(Tokens_1.default.findOne).toHaveBeenCalledWith({ where: { userEmail: email } });
        expect(bcrypt_1.default.compare).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=authService.test.js.map