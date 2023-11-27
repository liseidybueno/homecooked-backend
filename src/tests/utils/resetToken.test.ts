import {
  generateRandomToken,
  generateResetToken,
} from "../../utils/resetToken";
import Token from "../../models/Tokens";
import { sq } from "../../config/db";

describe("generateRandomToken", () => {
  it("should generate a random token of the specified length", () => {
    const length = 16;
    const token = generateRandomToken(length);

    // Check if the generated token has the correct length
    expect(token.length).toBe(length);

    // Check if the token only contains valid characters
    const validCharacters = /^[A-Za-z0-9]+$/;
    expect(token).toMatch(validCharacters);
  });

  it("should generate a default token of length 32 if no length is specified", () => {
    const defaultToken = generateRandomToken();

    // Check if the default token has the correct length
    expect(defaultToken.length).toBe(32);
  });
});

describe("generateResetToken", () => {
  it("should generate a reset token with the correct properties", async () => {
    const userEmail = "test@example.com";
    const token = await generateResetToken(userEmail);

    expect(token).toBeInstanceOf(Token);
    expect(token.userEmail).toBe(userEmail);

    const tokenLength = token.token.length;
    expect(tokenLength).toBe(32);
  });
});

afterAll(async () => {
  await sq.close();
});
