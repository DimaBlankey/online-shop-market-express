import { ValidationError } from "./client-errors";
import Joi from "joi";

class ReviewModel {
  id: number;
  productId: number;
  rating: number;
  review: string;
  userId: number;
  date: string;

  public constructor(review: ReviewModel) {
    this.id = review.id;
    this.productId = review.productId;
    this.rating = review.rating;
    this.review = review.review;
    this.userId = review.userId;
    this.date = review.date;
  }

  private static postValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    productId: Joi.number().integer().positive().required(),
    rating: Joi.number().integer().positive().required(),
    review: Joi.string().min(2).max(250).required(),
    userId: Joi.number().integer().positive().required(),
    date: Joi.date().required(),
  });
  public validateReviewPost(): void {
    const result = ReviewModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default ReviewModel;
