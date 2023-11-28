import authService from "../../services/authService";
import Token from "../../models/Tokens";
import User from "../../models/Users";
import bcrypt from "bcrypt";

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

    //Mock the findOne method of the User model
    User.findOne = jest.fn().mockResolvedValueOnce({
      email,
      firstName: "Test",
      lastName: "User",
      password: "oldPassword", // Assume the current password is 'oldPassword'
      save: jest.fn(), // Mock the save method
    });

    // Call the resetPassword function
    const result = await authService.resetPassword(email, token, password);

    expect(result).toBe(true);
  });

  it("should throw an error for invalid or expired token", async () => {
    // Mock data for testing
    const email = "test@example.com";
    const token = "invalidToken";
    const password = "newPassword";

    // Mock the findOne method of the Token model to return null (invalid token)
    Token.findOne = jest.fn().mockResolvedValueOnce(null);

    //Mock functions
    bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

    // Call the resetPassword function and expect it to throw an error
    await expect(
      authService.resetPassword(email, token, password)
    ).rejects.toThrow("Invalid or expired password reset token.");

    // Assertions
    expect(Token.findOne).toHaveBeenCalledWith({ where: { userEmail: email } });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });
});
