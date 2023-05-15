import express, { Request, Response, NextFunction } from "express";
import cyber from "../4-utils/cyber";
import UserModel from "../2-models/user-model";
import tokenService from "../5-services/token-service";

const router = express.Router();

router.post("/refresh-token/", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = request.body[0];
    const refreshToken = await tokenService.refreshToken(user);
    response.status(201).json(refreshToken);
  } catch (err: any) {
    next(err);
  }
});

export default router;
