"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resetToken_1 = require("../../utils/resetToken");
const db_1 = require("../../config/db");
beforeAll(async () => {
    await db_1.sq.sync({ force: true });
});
describe("generate random token", () => {
    it("generates a random token with the specified length", () => {
        const tokenLength = 10;
        const token = (0, resetToken_1.generateRandomToken)(tokenLength);
        expect(token.length).toBe(tokenLength);
        const validCharacters = /^[A-Za-z0-9]+$/;
        expect(token).toMatch(validCharacters);
    });
});
afterAll(async () => {
    await db_1.sq.close();
});
//# sourceMappingURL=resetToken.test.js.map