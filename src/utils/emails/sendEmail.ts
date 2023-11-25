import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const sendEmail = async (
  email: string,
  subject: string,
  payload: Record<string, any>,
  template: string
): Promise<string | void> => {
  try {
    const OAuth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    OAuth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    let accessToken;

    try {
      accessToken = await OAuth2Client.getAccessToken();
    } catch (error) {
      throw new Error("Could not get access token.");
    }

    const transporter: Transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        type: "OAuth2",
        user: "liseidybueno@gmail.com",
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken as string,
      },
    });

    const filePath = path.join(process.cwd(), template);
    const source = fs.readFileSync(filePath, "utf-8");

    const compiledTemplate = handlebars.compile(source);

    const options = {
      from: "liseidybueno@gmail.com",
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };

    // Send email
    const info = await transporter.sendMail(options);

    if (info) {
      return "Email sent successfully";
    } else {
      throw new Error("Email not sent");
    }
  } catch (error) {
    return error.message;
  }
};

export default sendEmail;
