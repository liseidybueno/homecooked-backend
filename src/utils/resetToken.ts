import Token, { TokenAttributes } from "../models/Tokens";

export const generateRandomToken = (length: number = 32): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
};

export const generateResetToken = async (userEmail: string): Promise<Token> => {
  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getHours() + 1);

  const token = await Token.create({
    userEmail,
    token: generateRandomToken(),
    expiry: expiryTime,
  } as TokenAttributes);

  return token;
};
