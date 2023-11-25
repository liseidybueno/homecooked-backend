import { Request, Response } from "express";
import authService from "../services/authService";

const resetPasswordRequestController = async (req: Request, res: Response) => {
  console.log("****inside reset");
  console.log("****req", req.body);
  const requestPasswordResetService = await authService.requestPasswordReset(
    req.body.email
  );
  return res.json(requestPasswordResetService);
};

const resetPasswordController = async (req: Request, res: Response) => {
  console.log("******inside reset password controller");
  console.log("****Req", req.body);
  const resetPasswordService = await authService.resetPassword(
    req.body.email,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};

export { resetPasswordController, resetPasswordRequestController };
