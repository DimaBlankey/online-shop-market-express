import express, { Request, Response, NextFunction } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import UserModel from "../2-models/user-model";
import userServices from "../5-services/user-services";

const router = express.Router();

router.put(
    "/user-update/:id",
    verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        request.body.id = +request.params.id;
        const user = new UserModel(request.body);
        const updatedUser = await userServices.updateUser(user);
        response.json(updatedUser);
      } catch (err: any) {
        next(err);
      }
    }
  );

export default router;
