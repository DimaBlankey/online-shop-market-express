import express, { Request, Response, NextFunction } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import reviewsServices from "../5-services/reviews-services";

const router = express.Router();

router.get(
  "/reviews/:userId",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const reviews = await reviewsServices.getReviewsByUser(userId);
      response.json(reviews);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
