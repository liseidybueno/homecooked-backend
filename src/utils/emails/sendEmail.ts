import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (
  email: string,
  subject: string,
  payload: Record<string, any>,
  template: string
): Promise<string | void> => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PW,
      },
    });

    const filePath = path.join(process.cwd(), template);
    const source = fs.readFileSync(filePath, "utf-8");

    const compiledTemplate = handlebars.compile(source);

    const options = {
      from: process.env.EMAIL_ADDRESS,
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
