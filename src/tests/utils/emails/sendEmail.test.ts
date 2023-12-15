import sendEmail from "../../../utils/emails/sendEmail";
import * as nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

jest.mock("nodemailer");

describe("sendEmail function", () => {
  it("should send an email successfully", async () => {
    const mockedCreateTransport =
      nodemailer.createTransport as jest.MockedFunction<
        typeof nodemailer.createTransport
      >;
    const mockedSendMail = jest.fn();

    mockedCreateTransport.mockReturnValue({
      sendMail: mockedSendMail.mockResolvedValueOnce({
        accepted: ["testemail@test.com"],
        rejected: [],
        messageId: "mocked-message-id",
      }),
    } as any);

    const result = await sendEmail(
      "testemail@test.com",
      "Test Subject",
      { name: "Test" },
      "src/utils/emails/template/requestResetPassword.handlebars"
    );

    expect(mockedSendMail).toHaveBeenCalledWith({
      from: process.env.EMAIL_ADDRESS,
      to: "testemail@test.com",
      subject: "Test Subject",
      html: expect.stringContaining("Hi Test"),
    });
    expect(result).toBe("Email sent successfully");
  });

  it("should not send an email successfully", async () => {
    const mockedCreateTransport =
      nodemailer.createTransport as jest.MockedFunction<
        typeof nodemailer.createTransport
      >;
    const mockedSendMail = jest.fn();

    mockedCreateTransport.mockReturnValue({
      sendMail: mockedSendMail.mockResolvedValueOnce(undefined),
    } as any);

    const result = await sendEmail(
      "testemail@test.com",
      "Test Subject",
      { name: "Test" },
      "src/utils/emails/template/requestResetPassword.handlebars"
    );

    expect(mockedSendMail).toHaveBeenCalledWith({
      from: process.env.EMAIL_ADDRESS,
      to: "testemail@test.com",
      subject: "Test Subject",
      html: expect.stringContaining("Hi Test"),
    });
    expect(result).toBe("Email not sent");
  });
});
