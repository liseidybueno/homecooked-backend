import { Request } from "express";
import authService from "../services/authService";

const resetPasswordRequestController = async (req: Request) => {
  const requestPasswordResetService = await authService.requestPasswordReset(
    req.body.email
  );
  return requestPasswordResetService;
};

const resetPasswordController = async (req: Request) => {
  const resetPasswordService = await authService.resetPassword(
    req.body.email,
    req.body.token,
    req.body.password
  );
  return resetPasswordService;
};

export { resetPasswordController, resetPasswordRequestController };
