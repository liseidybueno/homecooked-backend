import User from "../models/Users";
import Token, { TokenAttributes } from "../models/Tokens";
import crypto from "crypto";
import bcrypt from "bcrypt";
import sendEmail from "../utils/emails/sendEmail";

async function resetPassword(email: string, token: string, password: string) {
  console.log("****RESET PASSWORD HERE");
  console.log(email, token, password);
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
  console.log("");
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
  console.log("*****request password reset");
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

  const clientURL = "http://127.0.0.1:5173";

  const link = `${clientURL}/resetPassword?token=${resetToken}&id=${user.email}`;

  console.log("****before send email");

  console.log("****email", user.email);

  try {
    console.log("****inside try");
    sendEmail(
      email,
      "Password Reset Request",
      { name: user.firstName, link: link },
      "src/utils/emails/template/requestResetPassword.handlebars"
    );
  } catch (error) {
    console.log("***error", error);
  }
  // sendEmail(
  //   user.email,
  //   "Password Reset Request",
  //   { name: user.firstName, link: link },
  //   "src/utils/emails/template/requestResetPassword.handlebars"
  // );

  console.log("*******after send email");
  return link;
}

export default { requestPasswordReset, resetPassword };
