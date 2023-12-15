import authService from "../../services/authService";
import Token from "../../models/Tokens";
import User from "../../models/Users";
import bcrypt from "bcrypt";
import crypto from "crypto";

jest.mock("../../models/Tokens");
jest.mock("../../models/Users");
jest.mock("../../utils/emails/sendEmail");

describe("resetPassword", () => {
  it("should reset the password successfully", async () => {
    const email = "test@example.com";
    const token = "mockedToken";
    const password = "newPassword";

    //Mock the findOne method of the Token model
    Token.findOne = jest.fn().mockResolvedValueOnce({
      userEmail: email,
      token: await bcrypt.hash(token, 10), // Hash the token for comparison
      destroy: jest.fn(), // Mock the destroy method
    });

    const userMock = {
      email,
      firstName: "Test",
      lastName: "User",
      password, // Assume the current password is 'oldPassword'
      save: jest.fn(), // Mock the save method
    };

    //Mock the findOne method of the User model
    User.findOne = jest.fn().mockResolvedValueOnce(userMock);

    bcrypt.compare = jest.fn().mockResolvedValueOnce(true);

    // Call the resetPassword function
    const result = await authService.resetPassword(email, token, password);

    expect(result).toBe(true);
    // Assertions for calls
    expect(Token.findOne).toHaveBeenCalledWith({ where: { userEmail: email } });
    expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
    // Access 'save' after resolving the promise
    const resolvedUser = await User.findOne({ where: { email } });
    console.log("***resolved user", resolvedUser);
  });

  it("should throw an error if can't find token", async () => {
    // Mock data for testing
    const email = "test@example.com";
    const token = "invalidToken";
    const password = "newPassword";

    Token.findOne = jest.fn().mockResolvedValueOnce(null);
    try {
      await authService.resetPassword(email, token, password);
      // Fail the test if the function did not throw an error
      fail("Expected an error to be thrown");
    } catch (error) {
      // Assertions
      expect(error.message).toBe("Invalid or expired password reset token.");
    }

    bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

    expect(Token.findOne).toHaveBeenCalledWith({ where: { userEmail: email } });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it("should throw an error for invalid token", async () => {
    // Mock data for testing
    const email = "test@example.com";
    const token = "invalidToken";
    const password = "newPassword";

    // Mock the findOne method of the Token model to return null (invalid token)
    Token.findOne = jest.fn().mockResolvedValueOnce({
      userEmail: email,
      token: await bcrypt.hash("validToken", 10), // Use a different valid token
      destroy: jest.fn(), // Mock the destroy method
    });

    //Mock functions
    bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

    // Call the resetPassword function and expect it to throw an error
    try {
      await authService.resetPassword(email, token, password);
      // Fail the test if the function did not throw an error
      fail("Expected an error to be thrown");
    } catch (error) {
      // Assertions
      expect(error.message).toBe("Invalid or expired password reset token.");
    }

    // Assertions
    expect(Token.findOne).toHaveBeenCalledWith({ where: { userEmail: email } });
    expect(bcrypt.compare).toHaveBeenCalled(); // Ensure it's comparing with the valid token
    expect(Token.destroy).not.toHaveBeenCalled();
  });
});

describe("requestPasswordReset", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should request password reset successfully and return link", async () => {
    const email = "test@example.com";

    const userMock = {
      email,
      firstName: "Test",
      lastName: "User",
      password: "oldPassword", // Assume the current password is 'oldPassword'
      save: jest.fn(), // Mock the save method
    };

    const tokenMock = {
      userEmail: email,
      token: "hashedToken",
      expiry: new Date(),
    };

    User.findOne = jest.fn().mockResolvedValueOnce(userMock);
    Token.findOne = jest.fn().mockResolvedValueOnce(tokenMock);
    crypto.randomBytes = jest
      .fn()
      .mockReturnValueOnce(Buffer.from("randomBytes"));
    bcrypt.hash = jest.fn().mockResolvedValueOnce("hashedToken");

    const result = await authService.requestPasswordReset(email);

    expect(result).toBe(
      "http://127.0.0.1:5173/resetPassword?token=72616e646f6d4279746573&id=test@example.com"
    );
  });

  it("should throw an error if user does not exist", async () => {
    const email = "nonexistent@example.com";

    User.findOne = jest.fn().mockResolvedValueOnce(null);

    await expect(authService.requestPasswordReset(email)).rejects.toThrow(
      "User does not exist"
    );
    expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
    expect(Token.findOne).not.toHaveBeenCalled();
    expect(Token.destroy).not.toHaveBeenCalled();
  });
});
