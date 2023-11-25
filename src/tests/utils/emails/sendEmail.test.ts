jest.mock("nodemailer");

import sendEmail from "../../../utils/emails/sendEmail";
import * as nodemailer from "nodemailer";
import { jest } from "@jest/globals";

beforeEach(() => {
  jest.clearAllMocks(); // Clears mocks between tests
  jest.resetModules();
});

describe("sendEmail function", () => {
  it("should send an email successfully", async () => {
    const mockedCreateTransport =
      nodemailer.createTransport as jest.MockedFunction<
        typeof nodemailer.createTransport
      >;
    const mockedSendMail = jest.fn();

    mockedCreateTransport.mockReturnValue({
      sendMail: mockedSendMail.mockResolvedValueOnce({
        accepted: ["liseidybueno@gmail.com"],
        rejected: [],
        messageId: "mocked-message-id",
      }),
    } as any);

    const result = await sendEmail(
      "liseidybueno@gmail.com",
      "Test Subject",
      { name: "Liseidy" },
      "src/utils/emails/template/requestResetPassword.handlebars"
    );

    expect(mockedSendMail).toHaveBeenCalledWith({
      from: "liseidybueno@gmail.com",
      to: "liseidybueno@gmail.com",
      subject: "Test Subject",
      html: expect.stringContaining("Hi Liseidy"),
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
      "liseidybueno@gmail.com",
      "Test Subject",
      { name: "Liseidy" },
      "src/utils/emails/template/requestResetPassword.handlebars"
    );

    expect(mockedSendMail).toHaveBeenCalledWith({
      from: "liseidybueno@gmail.com",
      to: "liseidybueno@gmail.com",
      subject: "Test Subject",
      html: expect.stringContaining("Hi Liseidy"),
    });
    expect(result).toBe("Email not sent");
  });
});
