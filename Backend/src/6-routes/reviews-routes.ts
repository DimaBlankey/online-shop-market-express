import express, { Request, Response, NextFunction } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import reviewsServices from "../5-services/reviews-services";
import ReviewModel from "../2-models/review-model";

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

router.get(
  "/reviews-by-product/:productId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const productId = +request.params.productId;
      const reviews = await reviewsServices.getReviewsByProduct(productId);
      response.json(reviews);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/review-summery-by-product/:productId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const productId = +request.params.productId;
      const reviews = await reviewsServices.getReviewSummeryByProduct(productId);
      response.json(reviews);
    } catch (err: any) {
      next(err);
    }
  }
);


router.post(
  "/reviews",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const review = new ReviewModel(request.body);
      const updatedReview = await reviewsServices.addProductReview(review);
      response.status(201).json(updatedReview);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
