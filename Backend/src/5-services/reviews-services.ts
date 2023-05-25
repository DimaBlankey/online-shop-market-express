import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import ReviewModel from "../2-models/review-model";

async function getReviewsByUser(userId: number): Promise<ReviewModel[]> {
  const sql = `SELECT reviews.*,
  products.name,
  products.productCode
  FROM reviews
  JOIN products ON products.id = reviews.productId
  WHERE userId = ?`;

  const reviews = await dal.execute(sql, [userId]);

  return reviews;
}

async function getReviewsByProduct(productId: number): Promise<ReviewModel[]> {
  const sql = `SELECT reviews.*,
  users.firstName
  FROM reviews
  JOIN users ON users.id = reviews.userId
  WHERE productId = ?`;

  const reviews = await dal.execute(sql, [productId]);

  return reviews;
}

async function addProductReview(review: ReviewModel): Promise<ReviewModel> {
  // Do Validation

  // Sql check combination cannot be twice

  const date = new Date();

  const sql = `INSERT INTO reviews VALUES(DEFAULT, ?, ?, ?, ?, ?)`;

  const result: OkPacket = await dal.execute(sql, [
    review.productId,
    review.rating,
    review.review,
    review.userId,
    date,
  ]);
  review.id = result.insertId;

  return review;
}

export default {
  getReviewsByUser,
  getReviewsByProduct,
  addProductReview
};
