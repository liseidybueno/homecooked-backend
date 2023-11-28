import User from "../models/Users";
import Token, { TokenAttributes } from "../models/Tokens";
import crypto from "crypto";
import bcrypt from "bcrypt";
import sendEmail from "../utils/emails/sendEmail";

async function resetPassword(email: string, token: string, password: string) {
  let passwordResetToken = await Token.findOne({ where: { userEmail: email } });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token.");
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token.");
  }

  const currentUser = await User.findOne({
    where: {
      email,
    },
  });

  currentUser!.password = password;

  currentUser?.save();

  sendEmail(
    email,
    "Password Reset Successfully",
    { name: currentUser?.firstName },
    "src/utils/emails/template/resetPassword.handlebars"
  );

  await passwordResetToken.destroy();

  return true;
}

async function requestPasswordReset(email: string) {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  let token = await Token.findOne({
    where: {
      userEmail: email,
    },
  });

  if (token) {
    await token.destroy();
  }

  let resetToken = crypto.randomBytes(32).toString("hex");

  const hash = await bcrypt.hash(resetToken, 10);

  const currentDate = new Date();

  const newDate = new Date(currentDate.getTime() + 60 * 60 * 1000);

  await Token.create({
    userEmail: email,
    token: hash,
    expiry: newDate,
  } as TokenAttributes);

  const env = process.env.NODE_ENV || "development";

  const clientURL =
    env === "development"
      ? process.env.CLIENT_URL_DEV
      : process.env.CLIENT_URL_PROD;

  const link = `${clientURL}/resetPassword?token=${resetToken}&id=${user.email}`;

  try {
    sendEmail(
      email,
      "Password Reset Request",
      { name: user.firstName, link: link },
      "src/utils/emails/template/requestResetPassword.handlebars"
    );
  } catch (error) {
    console.log("Error sending email: ", error);
  }

  return link;
}

export default { requestPasswordReset, resetPassword };
